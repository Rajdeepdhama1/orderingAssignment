import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-VoterRegistration',
  templateUrl: './VoterRegistration.component.html'
})
export class VoterRegistrationComponent implements OnInit {
  _http: any;
  _baseUrl: string;
  countries: any;
  states: any;
  cities: any;
  public RegistrationModel = {
    countryID: null,
    stateID: null,
    cityID: null,
    userName: "",
    phone: null,
    address:"",
  };
   
  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this._baseUrl = apiUrl;
    this._http = http;
  }


  ngOnInit(): void {
    this._http.get(this._baseUrl + 'VoterSystem/GetCountryList').subscribe(result => {
      this.countries = result;
      console.log(this.countries);
    }, error => console.error(error));
  }



  getStates(id) {

      this._http.get(this._baseUrl + 'VoterSystem/GetStates?id=' + id).subscribe(result => {
      this.states = result;
      console.log(this.states);
    }, error => console.error(error));
  }
  getCities(id) {

    this._http.get(this._baseUrl + 'VoterSystem/GetCities?id=' + id).subscribe(result => {
      this.cities = result;
      console.log(this.cities);
    }, error => console.error(error));
  }
  Save() {
    this._http.post(this._baseUrl + 'VoterSystem/Registration', this.RegistrationModel).subscribe(result => {
      alert("Saved Successfully");
    }, error => console.error(error));
  }

}

interface RegistrationModel {
  countryID: number;
  stateID: number;
  cityID: number;
  userName: string;
  phone: number;
  address: string;

}
