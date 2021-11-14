import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'data-creation',
    loadChildren: () => import('./data-creation/data-creation.module').then(m => m.DataCreationModule)
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
