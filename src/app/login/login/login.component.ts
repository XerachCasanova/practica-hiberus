import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorsManagerService } from '../services/errors-manager.service';
import { LoginService } from '../services/login.service';

interface UserLogin{

  email: string,
  password: string,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {


  user: UserLogin | null;

  dataForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });
 
  

  constructor(private fb: FormBuilder, private router:Router,  private loginService:LoginService, 
    private errorsManager:ErrorsManagerService) {
 
    this.user=null;
  }

  ngOnInit(){
    
    if (this.loginService.isLogged()) this.router.navigate(['/usuarios']);
    
  }

  onSubmit() {
    this.user = {
      email: this.dataForm.value.email,
      password: this.dataForm.value.password
    }
    
    this.loginService.login(this.user).then(token => {
  
      sessionStorage.setItem('token', JSON.stringify(token));
      this.router.navigate(['/usuarios']);
      
    }).catch(error => {
      
      this.errorsManager.onError(error);

      this.dataForm.setValue({
        email: '',
        password: ''
      });

    });

  }

 
}
