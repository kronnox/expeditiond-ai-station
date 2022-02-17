import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataOverviewComponent} from "./data-overview.component";

const routes: Routes = [
  {
    path: '',
    component: DataOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataOverviewRoutingModule { }
