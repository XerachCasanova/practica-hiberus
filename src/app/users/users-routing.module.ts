import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { GestionComponent } from './gestion/gestion.component';
import { UsersShellComponent } from './users-shell.component';

const routes: Routes = [
   
  {  
    path: '', 
    component: UsersShellComponent,
    redirectTo: 'users-list',
    pathMatch: 'full'
  },
  { 
    path: '', 
    component: UsersShellComponent,
    children: [
      {
        path: 'users-list',
        component: GestionComponent
      },
      {
        path: 'charts', 
        component: ChartsComponent 
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
