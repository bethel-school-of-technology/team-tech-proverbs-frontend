import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAllToursComponent } from './components/get-all-tours/get-all-tours.component';

const routes: Routes = [
  {path: "", component: GetAllToursComponent},
  {path: "allTours", component: GetAllToursComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
