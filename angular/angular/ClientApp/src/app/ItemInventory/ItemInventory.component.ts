import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ItemInventory',
  templateUrl: './ItemInventory.component.html'
})
export class ItemInventoryComponent {
  public Items: any;
  public ItemInventoryModel = {
    ItemInventoryId: 0,
    ItemQuantity: "",
    ItemRate: "",
    ItemID: "",
    CreateDate: 0,
    ItemName: "",
  };
  public UpdateItemModel = {
    ItemInventoryId: 0,
    ItemQuantity: 0,
    ItemRate: 0,
  };


  private _http: HttpClient;
  _baseUrl: string;
  dtItems: ItemInventoryModel;


  constructor(http: HttpClient, @Inject('API_URL') ApiUrl: string) {
    this._baseUrl = ApiUrl;
    this._http = http;
    this._http.get(ApiUrl + 'Default/GetItems').subscribe(result => {
      this.Items = result;
      console.log(this.Items);
      this._http = http;
      this.ItemInventoryModel = {
        ItemInventoryId: 0,
        ItemQuantity: "",
        ItemRate: "",
        ItemID: "",
        CreateDate: 0,
        ItemName: "",
      }
    }, error => console.error(error));
    this.LoadItem();
  }

  LoadItem() {
    this._http.get<ItemInventoryModel>(this._baseUrl + 'Default/GetItemInventory').subscribe(result => {
      this.dtItems = result;
      console.log(this.dtItems);
    }, error => console.error(error));
  }
  Save() {
    this._http.post<ItemInventoryModel>(this._baseUrl + 'Default/SaveItemInventory', this.ItemInventoryModel).subscribe(result => {
      alert("Saved Successfully");
      this.LoadItem();
    }, error => console.error(error));
  }
  Update() {
    this._http.post<UpdateItemModel>(this._baseUrl + 'Default/UpdateItemInventory', this.UpdateItemModel).subscribe(result => {
      this.LoadItem();
      alert("Updated Successfully");
      
    }, error => console.error(error));
  }

  openDetails(obj) {

    this.UpdateItemModel = Object.assign({}, obj);
    console.log(this.UpdateItemModel)
  }
}
interface ItemInventoryModel {
  ItemInventoryId: number;
  ItemQuantity: number;
  ItemRate: number;
  ItemID: number;
  CreateDate: any;
  ItemName: string;
} 
interface UpdateItemModel {
  ItemInventoryId: number;
  ItemQuantity: number;
  ItemRate: number;
}
