import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: 'usuarios', 
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
