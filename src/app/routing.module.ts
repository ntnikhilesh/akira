 import {NgModule} from '@angular/core';

 import {Routes, RouterModule} from '@angular/router';

 

 
 


 import {LoginComponent} from './components/login/login.component';
 import {FilelistingsComponent} from './components/filelistings/filelistings.component';
 import {FilelistingComponent} from './components/filelisting/filelisting.component';
 import {UploadfileComponent} from './components/uploadfile/uploadfile.component';
 import {QueryComponent} from './components/query/query.component';
 import {RegComponent} from './reg/reg.component';




const routes:Routes=[

{path:'',redirectTo:'/login',pathMatch:'full'},
{path:'login',component:LoginComponent},
{path:'uploadfile',component:UploadfileComponent},
{path:'filelistings',component:FilelistingsComponent},
{path:'query',component:QueryComponent},
{path:'filelisting/:id', component:FilelistingComponent},


{path:'register',component:RegComponent},

   


	

];

 @NgModule({
 imports:[RouterModule.forRoot(routes)],
 exports:[RouterModule]
 })

 export class RoutingModule{}