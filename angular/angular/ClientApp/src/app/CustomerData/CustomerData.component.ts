import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-CustomerData',
  templateUrl: './CustomerData.component.html'
})
export class CustomerDataComponent {
  public CustomerDataModel = {
    CustomerID: 0, 
    CustomerName: "",
    CustomerEmail:"",
  };


  private _http: HttpClient;
  _baseUrl: string;
  items: any;
  count: number = 0;
  updateCount: number = 0;


  constructor(http: HttpClient, @Inject('API_URL') ApiUrl: string) {
      this._baseUrl = ApiUrl;
      this._http = http;
    this.CustomerDataModel = {
        CustomerID: 0,
        CustomerName: "",
        CustomerEmail: "",
    }
    this.GetData();
  }

  GetData() {
    this._http.get<any>(this._baseUrl + 'Default/GetCustomers').subscribe(result => {
      this.items = result;
      console.log(this.items);
    }, error => console.error(error));
  }
  Save() {
    if (this.updateCount !== 0) {
      this._http.post<CustomerDataModel>(this._baseUrl + 'Default/UpdateCustomerDetails', this.CustomerDataModel).subscribe(result => {
        this.GetData()
        alert("Updated Successfully");
        this.updateCount--;

      }, error => console.error(error));

    }
    else {
      for (let item of this.items) {
        if (this.CustomerDataModel.CustomerEmail == item.customerEmail) {
          this.count = this.count + 1;
        }
        else {
          console.log("hiii")
        }
      }
      if (this.count !== 0) {
        this.count = 0;
        alert("Customer Email Already Exists.")

      }
      else {
        this._http.post<CustomerDataModel>(this._baseUrl + 'Default/SaveCustomerData', this.CustomerDataModel).subscribe(result => {
          this.GetData()
          alert("Saved Successfully");
        }, error => console.error(error));
      }
    }
  }
  SendData(obj) {
    console.log(obj);
    this.CustomerDataModel = {
      CustomerID: obj.customerID,
      CustomerName: obj.customerName,
      CustomerEmail: obj.customerEmail
    }
    this.updateCount++;
  }
}
interface CustomerDataModel {
  CustomerID: number;
  CustomerName: string;
  CustomerEmail: string;
}

