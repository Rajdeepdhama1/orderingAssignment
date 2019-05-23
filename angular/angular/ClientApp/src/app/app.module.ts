import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ItemMasterComponent } from './ItemMaster/ItemMaster.component';
import { ItemInventoryComponent } from './ItemInventory/ItemInventory.component';
import { CustomerDataComponent } from './CustomerData/CustomerData.component';
import { ItemOrderComponent } from './ItemOrder/ItemOrder.component';
import { VoterRegistrationComponent } from './VoterRegistration/VoterRegistration.component';
import { ItemAddressComponent } from './ItemAddress/ItemAddress.component';
import { filter } from './filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ItemMasterComponent,
    ItemInventoryComponent,
    CustomerDataComponent,
    ItemOrderComponent,
    VoterRegistrationComponent,
    ItemAddressComponent,
    filter
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'ItemMaster', component: ItemMasterComponent },
      { path: 'ItemInventory', component: ItemInventoryComponent },
      { path: 'CustomerData', component: CustomerDataComponent },
      { path: 'ItemOrder', component: ItemOrderComponent },
      { path: 'VoterRegistration', component: VoterRegistrationComponent },
      { path: 'ItemAddress', component: ItemAddressComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
