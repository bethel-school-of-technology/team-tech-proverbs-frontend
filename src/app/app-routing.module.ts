import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAllToursComponent } from './components/get-all-tours/get-all-tours.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserSigninComponent } from './components/user-signin/user-signin.component';

const routes: Routes = [
  {path: "", component: GetAllToursComponent},
  {path: "allTours", component: GetAllToursComponent},
  {path: "signup", component: SignUpComponent},
  {path: "login", component: UserSigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
