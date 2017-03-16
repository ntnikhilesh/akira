

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { AppComponent } from './app.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';

import {WegService} from './services/weg.service';
//import { WegComponent } from './weg/weg.component';


import { MainTabDetailComponent } from './main-tab-detail/main-tab-detail.component';

import {RoutingModule} from './routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { BillingComponentComponent } from './billing-component/billing-component.component';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReportComponent } from './report/report.component';
import { SettingComponent } from './setting/setting.component';
import { SupportComponent } from './support/support.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { ExpandableListModule } from 'angular2-expandable-list';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrganiseCategoryComponent } from './organise-category/organise-category.component';
import { BillingMenuComponent } from './billing-menu/billing-menu.component';
import { InventoryMenuComponent } from './inventory-menu/inventory-menu.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { ReportDetailTableComponent } from './report-detail-table/report-detail-table.component';
import { StoreInfoComponent } from './store-info/store-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { DeviceStatusComponent } from './device-status/device-status.component';
import { ContactComponent } from './contact/contact.component';
import { Test } from './providers/test.service';

import {FirebaseService} from './services/firebase.service';

import { AngularFireOfflineModule } from 'angularfire2-offline';

//Auth

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { ObillingComponentComponent } from './obilling-component/obilling-component.component';
import { OmainTabDetailComponent } from './omain-tab-detail/omain-tab-detail.component';
import { AddItemDemoComponent } from './add-item-demo/add-item-demo.component';

//Local storage

import { LocalStorageModule } from 'angular-2-local-storage';
import { RegComponent } from './reg/reg.component';

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup       //we can use Redirect as well
};


export const firebaseConfig = {
  apiKey: "AIzaSyC990yhWFcPv2k2QUxLgAxNXcYgfOpgbck",
    authDomain: "td-demo-df34d.firebaseapp.com",
    databaseURL: "https://td-demo-df34d.firebaseio.com",
    storageBucket: "td-demo-df34d.appspot.com",
    messagingSenderId: "300613950722"
};



@NgModule({
  declarations: [
    AppComponent,
    BillDetailComponent,
    //WegComponent,
    
    
    MainTabDetailComponent,
    
    DashboardComponent,
    MenuDetailComponent,
    BillingComponentComponent,
    LoginComponent,
    InventoryComponent,
    ReportComponent,
    SettingComponent,
    SupportComponent,
    InventoryListComponent,
    CreateProductComponent,
    EditProductComponent,
    OrganiseCategoryComponent,
    BillingMenuComponent,
    InventoryMenuComponent,
    ReportTableComponent,
    ReportDetailTableComponent,
    StoreInfoComponent,
    ContactInfoComponent,
    DeviceStatusComponent,
    ContactComponent,
    ObillingComponentComponent,
    OmainTabDetailComponent,
    AddItemDemoComponent,
    RegComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    FormsModule,
    HttpModule,
    MaterialModule,
    RoutingModule,
    AngularFireOfflineModule,
    ExpandableListModule,
    LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        })
  ],
  providers: [WegService,FirebaseService],
  entryComponents: [CreateProductComponent,EditProductComponent,OrganiseCategoryComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
