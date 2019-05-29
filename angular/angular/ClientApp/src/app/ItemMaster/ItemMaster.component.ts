import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ItemMaster',
  templateUrl: './ItemMaster.component.html'
})
export class ItemMasterComponent {
  public categories: any;
  items: any;
  public ItemMasterModel = {
    ItemId: 0,
    CategoryName: "",
    ItemName: "",
    CategoryID: "",
  };
  private _http: HttpClient;
  _baseUrl: string;
  count: number = 0;
  updateCount: number = 0;
  isDisabled = false;
  name: any;
 



  constructor(http: HttpClient, @Inject('API_URL') ApiUrl: string) {
    this._baseUrl = ApiUrl;
    this._http = http;
    this.ItemMasterModel = {
      ItemId: 0,
      CategoryName: "",
      ItemName: "",
      CategoryID: "",
    }
    http.get(ApiUrl + 'Default/GetCategory').subscribe(result => {
      this.categories = result;
      console.log(this.categories);
      }, error => console.error(error));

    this.GetData();
  }
  GetData() {
    this._http.get<any>(this._baseUrl + 'Default/GetItemsCname').subscribe(result => {
      this.items = result;
      console.log(this.items);
    }, error => console.error(error));
  }

  Reset() {
    this.ItemMasterModel = {
      ItemId: 0,
      CategoryName: "",
      ItemName: "",
      CategoryID: "",
    }
  }
  Save() {
      for (let item of this.items) {
        if (this.ItemMasterModel.ItemName == item.itemName) {
          this.count = this.count + 1;
        }
        else {
          console.log("hiii")
        }
      }

    if ((this.count !== 0 && this.updateCount == 0) || (this.count > 1 && this.updateCount == 1 && this.ItemMasterModel.ItemName == this.name) || (this.count > 0 && this.updateCount == 1 && this.ItemMasterModel.ItemName !== this.name)) {
      this.count = 0;
      alert("Item Name Already Exists.")
      this.updateCount = 0;
      this.Reset();
    }
    else {
      this.isDisabled = true;
      if (this.updateCount !== 0) {
        this._http.post<ItemMasterModel>(this._baseUrl + 'Default/UpdateItemDetails', this.ItemMasterModel).subscribe(result => {
          this.GetData()
          alert("Updated Successfully");
          this.updateCount = 0;
          this.count = 0;
          this.isDisabled = false;
          this.Reset();

        }, error => console.error(error));

      }
      else {
        this._http.post<ItemMasterModel>(this._baseUrl + 'Default/SaveItem', this.ItemMasterModel).subscribe(result => {
          alert("Saved Successfully");
          this.isDisabled = false;
          this.GetData();
          this.Reset();
        }, error => console.error(error));
      }
    } 
  }
  SendData(obj) {
    console.log(obj);
    this.ItemMasterModel = {
      ItemId: obj.itemID,
      CategoryName: obj.categoryName,
      ItemName: obj.itemName,
      CategoryID: obj.categoryID
    }
    this.name = obj.itemName;
    this.updateCount++;
  }
}
interface ItemMasterModel {
  ItemId: number;
  CategoryName: string;
  ItemName: string;
  CategoryID: number;
}
