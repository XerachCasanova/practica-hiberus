import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorsManagerService } from './services/errors-manager.service';
import { NotificationsService } from './services/notifications.service';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,

  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    LoginComponent,
    SignupComponent
  ],
  providers: [
    ErrorsManagerService,
    NotificationsService
  ]
})
export class LoginModule { }
