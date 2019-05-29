import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ItemOrder',
  templateUrl: './ItemOrder.component.html'
})
export class ItemOrderComponent implements OnInit {
 
  public customers: any;
  public arr: Array<{ customerID: number, itemID: number, ItemOrderQuantity: number, TotalAmount: number, id: number, ItemName: string }> = [];
  public orderedItems: any;
  public iName: string;
 
  public ItemOrder = {
    OrderID: 0,
    ItemOrderQuantity: 0,
    TotalAmount: 0,
    customerID: 0,
    itemID: 0,
    ID: 0,
  };
  
  private _baseUrl: string;
  private _http: HttpClient;
  items: any;
  myPrice: number;
  RateList: any;
  public result: any;

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this._baseUrl = apiUrl;
    this._http = http;
  
    this.ItemOrder = {
      OrderID: 0,
      ItemOrderQuantity: 0,
      TotalAmount: 0,
      customerID: 0,
      itemID: 0,
      ID: 0,
    };
    

    this._http.get(this._baseUrl + 'Default/GetItems').subscribe(result => {
      this.items = result;
      console.log(this.items)
    }, error => console.error(error));

    this._http.get(this._baseUrl + 'Default/GetCustomers').subscribe(result => {
      this.customers = result;
    }, error => console.error(error));

  }

  ngOnInit(): void {
    this._http.get<any>(this._baseUrl + 'Default/GetRateList').subscribe(result => {
      this.RateList = result;
      console.log(this.RateList);
    }, error => console.error(error));
  }

  Save() {
    if (this.arr.length > 0) {
      this._http.post<void>(this._baseUrl + 'Default/PostItemOrder', this.arr).subscribe(result => {
        alert("Saved Successfully");
      }, error => console.error(error));
    }
    else {
      alert("Add an Item..")
    }
  }
  Delete(RowIndex) {
    if (RowIndex > -1) {
      this.arr.splice(RowIndex, 1);
    }
  }

  Add()
  {
    for (let item of this.items) {
      if (item.itemID == this.ItemOrder.itemID) {
        this.iName = item.itemName;
      }
    }
    if (this.ItemOrder.customerID == 0 || this.ItemOrder.itemID == 0 || this.ItemOrder.ItemOrderQuantity == 0) {
    
      alert("Fill All the Inputs.")
    }
    else {
      if (this.arr.length == 0 || this.ItemOrder.ID == 0) {
        this.arr.push({
          customerID: this.ItemOrder.customerID,
          itemID: this.ItemOrder.itemID,
          ItemOrderQuantity: this.ItemOrder.ItemOrderQuantity,
          TotalAmount: this.ItemOrder.TotalAmount,
          id: this.arr.length + 1,
          ItemName: this.iName
        })
      }
      else {
        for (let Array of this.arr) {
          if (Array.id == this.ItemOrder.ID) {
            Array.customerID = this.ItemOrder.customerID;
            Array.itemID = this.ItemOrder.itemID;
            Array.ItemOrderQuantity = this.ItemOrder.ItemOrderQuantity;
            Array.TotalAmount = this.ItemOrder.TotalAmount;
            Array.id = this.ItemOrder.ID;
            Array.ItemName = this.iName
          }
          else {
            console.log(this.ItemOrder.ID)

          }
        }
      }
    }
    this.ItemOrder = {
      OrderID: 0,
      ItemOrderQuantity: 0,
      TotalAmount: 0,
      customerID: 0,
      itemID: 0,
      ID: 0,
    };
}


 
  getPrice(itemID) {
    if (this.ItemOrder.ItemOrderQuantity == 0) {
      this.ItemOrder.TotalAmount = 0;
    }
    else {
      var result = this.RateList[itemID];
      this.ItemOrder.TotalAmount = parseFloat((result * this.ItemOrder.ItemOrderQuantity).toFixed(2));
    }  
    
    //this._http.get<any>(this._baseUrl + 'Default/GetItemRate?id=' + this.ItemOrder.itemID).subscribe(result => {
    //  this.ItemOrder.TotalAmount = parseFloat((result * this.ItemOrder.ItemOrderQuantity).toFixed(2));
    //  console.log(this.ItemOrder.TotalAmount);
    //}, error => console.error(error));
  }
  LoadData(Obj) {
    console.log(Obj);
    this.ItemOrder = {
      OrderID: 0,
      ItemOrderQuantity: Obj.ItemOrderQuantity,
      TotalAmount: Obj.TotalAmount,
      customerID: Obj.customerID,
      itemID: Obj.itemID,
      ID: Obj.id,
    };
  }
}



interface ItemOrder {
  OrderID: number;
  ItemOrderQuantity: number;
  TotalAmount: number;
  ItemID: number;
  customerID: number;
  ID: number;
  ItemName: string;

}
