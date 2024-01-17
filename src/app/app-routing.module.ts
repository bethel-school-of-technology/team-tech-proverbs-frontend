import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAllToursComponent } from './components/get-all-tours/get-all-tours.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: "", component: GetAllToursComponent},
  {path: "allTours", component: GetAllToursComponent},
  {path: "home", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
