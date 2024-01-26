import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAllToursComponent } from './components/get-all-tours/get-all-tours.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserSigninComponent } from './components/user-signin/user-signin.component';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "tours", component: GetAllToursComponent},
  {path: "home", component: HomeComponent},
  {path: "signup", component: SignUpComponent},
  {path: "login", component: UserSigninComponent},
  {path: "tourdetails/:slug", component: TourDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
