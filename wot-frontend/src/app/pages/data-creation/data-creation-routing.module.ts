import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataCreationComponent} from "./data-creation.component";

const routes: Routes = [
  {
    path: '',
    component: DataCreationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataCreationRoutingModule { }
