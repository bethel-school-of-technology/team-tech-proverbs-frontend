import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetAllToursComponent } from './components/get-all-tours/get-all-tours.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserSigninComponent } from './components/user-signin/user-signin.component';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';

@NgModule({
  declarations: [
    AppComponent,
    GetAllToursComponent,
    HomeComponent,
    SignUpComponent,
    UserSigninComponent,
    TourDetailsComponent,
   
  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatCardModule, MatButtonModule,MatIconModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
