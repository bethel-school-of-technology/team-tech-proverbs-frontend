import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { GetAllToursComponent } from './components/get-all-tours/get-all-tours.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserSigninComponent } from './components/user-signin/user-signin.component';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuardCheck } from './services/auth-guard-check.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MyToursComponent } from './components/my-tours/my-tours.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tours', component: GetAllToursComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: UserSigninComponent },
  { path: 'aboutus', component: AboutUsComponent },
  {path: 'profile',component: UserProfileComponent,canActivate: [AuthGuardCheck],},
  {path: 'profile/my-tours',component: MyToursComponent,canActivate: [AuthGuardCheck],},
  { path: 'tourDetails/:id', component: TourDetailsComponent },
  // { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
