import { Component, Inject, HostListener} from '@angular/core';
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
  @HostListener("window:scroll", [''])
  onScroll(): void {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight || this.updateCount !== 0) {
 
      console.log(event)
      this.index = this.index + 10;
      this._http.get<any>(this._baseUrl + 'Default/GetCustomersList?id=' + this.index).subscribe(result => {
        this.itemsList = result;
        console.log(this.itemsList);
      }, error => console.error(error));
    
 
    }
  
  }
  private _http: HttpClient;
  _baseUrl: string;
  items: any;
  count: number = 0;
  updateCount: number = 0;
  isDisabled = false;
  email: any;
  index: any = 0;
  itemsList: any;

  constructor(http: HttpClient, @Inject('API_URL') ApiUrl: string) {
      this._baseUrl = ApiUrl;
      this._http = http;
    this.CustomerDataModel = {
        CustomerID: 0,
        CustomerName: "",
        CustomerEmail: "",
    }
    this.GetData();
    this.GetDataList();
  }
  GetDataList() {
    this.index = this.index + 10;
    this._http.get<any>(this._baseUrl + 'Default/GetCustomersList?id=' + this.index).subscribe(result => {
      this.itemsList = result;
      console.log(this.itemsList);
    }, error => console.error(error));
  }
  GetData() {
    this._http.get<any>(this._baseUrl + 'Default/GetCustomers').subscribe(result => {
      this.items = result;
      console.log(this.items);
    }, error => console.error(error));
  }
 
  Reset() {
    this.CustomerDataModel = {
      CustomerID: 0,
      CustomerName: "" ,
      CustomerEmail: "",
    }  
  }
  Save() {

    for (let item of this.items) {
      if (this.CustomerDataModel.CustomerEmail == item.customerEmail) {
        this.count = this.count + 1;
      }
      else {
        console.log("hiii")
      }
    }
    if ((this.count !== 0 && this.updateCount == 0) || (this.count > 1 && this.updateCount == 1 && this.CustomerDataModel.CustomerEmail == this.email) ||
       (this.count > 0 && this.updateCount == 1 && this.CustomerDataModel.CustomerEmail !== this.email)) {
      this.count = 0;
      alert("Customer Email Already Exists.")
      this.updateCount = 0;
    }
    else {
      this.isDisabled = true;
      if (this.updateCount !== 0) {
        this._http.post<CustomerDataModel>(this._baseUrl + 'Default/UpdateCustomerDetails', this.CustomerDataModel).subscribe(result => {
          this.GetData()
          alert("Updated Successfully");
          this.updateCount=0;
          this.count = 0;
          this.isDisabled = false;
        }, error => console.error(error));
        this.onScroll();
      }
      else {
        this._http.post<CustomerDataModel>(this._baseUrl + 'Default/SaveCustomerData', this.CustomerDataModel).subscribe(result => {
          this.GetData()
          alert("Saved Successfully");
          this.isDisabled = false;
        }, error => console.error(error));
      }
    }
    this.Reset();
  }
  SendData(obj) {
    console.log(obj);
    this.CustomerDataModel = {
      CustomerID: obj.customerID,
      CustomerName: obj.customerName,
      CustomerEmail: obj.customerEmail
    }
    this.email = obj.customerEmail;
    this.updateCount++;
  }
}
interface CustomerDataModel {
  CustomerID: number;
  CustomerName: string;
  CustomerEmail: string;
}

