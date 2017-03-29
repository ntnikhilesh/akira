 import {NgModule} from '@angular/core';

 import {Routes, RouterModule} from '@angular/router';

 

 
 

 import {BillingComponentComponent} from './billing-component/billing-component.component';
 import {LoginComponent} from './components/login/login.component';
 import {FilelistingsComponent} from './components/filelistings/filelistings.component';
 import {FilelistingComponent} from './components/filelisting/filelisting.component';
 import {RegComponent} from './reg/reg.component';




const routes:Routes=[

{path:'',redirectTo:'/login',pathMatch:'full'},
{path:'login',component:LoginComponent},

{path:'filelistings',component:FilelistingsComponent},
{path:'filelisting/:id', component:FilelistingComponent},

{path:'billing',component:BillingComponentComponent},
{path:'register',component:RegComponent},

   


	

];

 @NgModule({
 imports:[RouterModule.forRoot(routes)],
 exports:[RouterModule]
 })

 export class RoutingModule{}