import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlApi:string;
  
  constructor(private httpClient:HttpClient, private router:Router) { 

    this.urlApi = environment.ipHiberus;
    
  
  }

  public isLogged():boolean{
    
 
    const token = sessionStorage.getItem('token');

    if(!token){
      return false;
    }

    return true;

  }

  async login(user:any){
    
    let url = this.urlApi + '/api/v1/auth/log-in'
 
    return await this.httpClient.post(url, user).toPromise();

  }

  async signUp(user:any){

    let url = this.urlApi + '/api/v1/auth/sign-up'

    return this.httpClient.post(url, user).toPromise();

  }

}
