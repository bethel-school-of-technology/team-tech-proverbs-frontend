import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetAllToursComponent } from './components/get-all-tours/get-all-tours.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    GetAllToursComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatCardModule, MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
