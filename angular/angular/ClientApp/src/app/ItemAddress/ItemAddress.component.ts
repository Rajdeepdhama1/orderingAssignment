import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-itemAddress',
  templateUrl: './itemAddress.component.html'
})

export class ItemAddressComponent {

  public progress: number;
  public message: string;
  public fileLocation: any;
  public path: any;
  public fileAddress: any;
  @Output() public onUploadFinished = new EventEmitter();

  public categories: any;
  public ItemMasterModel = {
    ItemId: 0,
    ItemName: "",
    CategoryID: "",
    Address: ""
  };

  private _http: HttpClient;
  _baseUrl: string;

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {

    this._baseUrl = apiUrl;
    http.get(apiUrl + 'Default/GetItems').subscribe(result => {
      this.categories = result;
      // console.log(this.categories);
      this._http = http;
      this.ItemMasterModel = {
        ItemId: 0,
        ItemName: "",
        CategoryID: "",
        Address: ""
      }
    }, error => console.error(error));
  }


  Save() {
    this._http.post<ItemAddressModel>(this._baseUrl + 'Default/SaveCategoryAddress', this.ItemMasterModel).subscribe(result => {
      alert("success");
    }, error => console.error(error));
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload);

    this._http.post(this._baseUrl + 'Default/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.path = event.body['fullPath'];
          this.ItemMasterModel.Address = this.path;
          this.Save();
        }

        console.log(this.path);
        console.log(event);
      });

  }
}

interface ItemAddressModel {
  ItemName: string;
  Address: string;
}
