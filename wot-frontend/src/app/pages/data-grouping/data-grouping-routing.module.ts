import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGroupingComponent } from './data-grouping.component';

const routes: Routes = [
  {
    path: '',
    component: DataGroupingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataGroupingRoutingModule { }
