

import { BrowserModule } from '@angular/platform-browser';
//import BrowserAnimationsModule from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { AppComponent } from './app.component';


import {WegService} from './services/weg.service';
//import { WegComponent } from './weg/weg.component';




import {RoutingModule} from './routing.module';




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


import { FilelistingsComponent } from './components/filelistings/filelistings.component';
import { FilelistingComponent } from './components/filelisting/filelisting.component';
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
import { QueryComponent } from './components/query/query.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TestSedenavComponent } from './components/test-sedenav/test-sedenav.component';

// import {BusyModule} from 'angular2-busy';
import { LaddaModule } from 'angular2-ladda';

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
    
    
    
    
    
    
   
    LoginComponent,
    
    
    
    RegComponent,
    
  
    
   
    
    FilelistingsComponent,
    
    FilelistingComponent,
    
    UploadfileComponent,
    
    QueryComponent,
    
    SideNavComponent,
    
    TestSedenavComponent,
    
    
  ],
  imports: [
    BrowserModule,
    //BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    FormsModule,
    HttpModule,
     LaddaModule.forRoot({
            style: "contract",
            spinnerSize: 120,
            spinnerColor: "#FF0000",
            spinnerLines: 12
        }),
     //BusyModule,
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
