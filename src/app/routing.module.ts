 import {NgModule} from '@angular/core';

 import {Routes, RouterModule} from '@angular/router';

 

 import {MainTabDetailComponent} from './main-tab-detail/main-tab-detail.component';
 

 import {BillingComponentComponent} from './billing-component/billing-component.component';
 import {LoginComponent} from './login/login.component';

 import {RegComponent} from './reg/reg.component';




const routes:Routes=[

{path:'',redirectTo:'/login',pathMatch:'full'},
{path:'login',component:LoginComponent},

{path:'mainTab',component:MainTabDetailComponent},

{path:'billing',component:BillingComponentComponent},
{path:'register',component:RegComponent},


	

];

 @NgModule({
 imports:[RouterModule.forRoot(routes)],
 exports:[RouterModule]
 })

 export class RoutingModule{}