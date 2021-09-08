import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GestionComponent } from './gestion/gestion.component';
import { FormUsersComponent } from './form-users/form-users.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioDaoService } from './DAO/usuarioDao.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartsComponent } from './charts/charts.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { GoogleChartsModule } from 'angular-google-charts';
import { UsersShellComponent } from './users-shell.component';
import { NotificationsService } from '../login/services/notifications.service';
import { ErrorsManagerService } from '../login/services/errors-manager.service';


@NgModule({
  declarations: [
    ListUsersComponent,
    GestionComponent,
    FormUsersComponent,
    ChartsComponent,
    UsersShellComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    UsersRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    GoogleChartsModule
  ],
  providers:[    
    {       
      provide: HTTP_INTERCEPTORS,      
      useClass: AuthInterceptorService,     
      multi:true   
     },
     UsuarioDaoService,
     NotificationsService,
     ErrorsManagerService
     
  ]
})
export class UsersModule { }
