import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'data-creation',
    loadChildren: () => import('./data-creation/data-creation.module').then(m => m.DataCreationModule)
  },  {
    path: 'data-overview',
    loadChildren: () => import('./data-overview/data-overview.module').then(m => m.DataOverviewModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'data-creation'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
