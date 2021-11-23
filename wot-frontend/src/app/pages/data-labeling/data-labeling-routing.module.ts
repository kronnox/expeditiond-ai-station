import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataLabelingComponent } from './data-labeling.component';

const routes: Routes = [
  {
    path: '',
    component: DataLabelingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataLabelingRoutingModule { }
