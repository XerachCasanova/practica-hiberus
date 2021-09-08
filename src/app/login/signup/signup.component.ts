import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ErrorsManagerService } from '../services/errors-manager.service';
import { LoginService } from '../services/login.service';
import { NotificationsService } from '../services/notifications.service';

interface UserSignUp{
  name:string,
  surname:string,
  email:string,
  password:string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent {
  addressForm = this.fb.group({
    name: [null, Validators.required],
    surname: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(4)]],

  });


  urlApi:string;

  userSignUp: UserSignUp;


  constructor(private fb: FormBuilder, private router:Router, private loginService:LoginService, 
    private notifications:NotificationsService, private errorsManager: ErrorsManagerService) {

    this.urlApi = `${environment.ipHiberus}/api/v1/auth/log-in`;
    
    this.userSignUp = {
      name: '',
      surname: '',
      email: '',
      password: ''
    }
    
  }

  async onSubmit() {

    this.userSignUp = {
      name: this.addressForm.value.name,
      surname: this.addressForm.value.surname,
      email: this.addressForm.value.email,
      password: this.addressForm.value.password,

    }


    await this.loginService.signUp(this.userSignUp).then(
      data => {
        this.router.navigate(['/login']);
        this.notifications.openSnackBar('Usuario creado correctamente.');

      }, error => {
        
        this.errorsManager.onError(error);

        this.addressForm.setValue({
          name: '',
          surname: '',     
          email: '',
          password: ''
        });
      
      });
    
  }


}
