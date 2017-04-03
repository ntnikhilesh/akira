

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { AppComponent } from './app.component';


import {WegService} from './services/weg.service';
//import { WegComponent } from './weg/weg.component';




import {RoutingModule} from './routing.module';



import { BillingComponentComponent } from './billing-component/billing-component.component';
import { LoginComponent } from './components/login/login.component';



import { ExpandableListModule } from 'angular2-expandable-list';

import { Test } from './providers/test.service';

import {FirebaseService} from './services/firebase.service';

import { AngularFireOfflineModule } from 'angularfire2-offline';

//Auth

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';



//Local storage

import { LocalStorageModule } from 'angular-2-local-storage';
import { RegComponent } from './reg/reg.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilelistingsComponent } from './components/filelistings/filelistings.component';
import { FilelistingComponent } from './components/filelisting/filelisting.component';
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
import { QueryComponent } from './components/query/query.component';


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
    
    
    
    
    
    
    BillingComponentComponent,
    LoginComponent,
    
    
    
    RegComponent,
    
    DashboardComponent,
    
    NavbarComponent,
    
    FilelistingsComponent,
    
    FilelistingComponent,
    
    UploadfileComponent,
    
    QueryComponent,
    
    
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
  providers: [WegService,FirebaseService,Test],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
