import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Mongoose } from 'mongoose';
import { ErrorsManagerService } from 'src/app/login/services/errors-manager.service';
import { environment } from 'src/environments/environment';
import { UsuarioDTO } from '../DTO/UsuarioDTO';
import { usuarioDAOI } from '../interfaces/UsuarioDAOI';


@Injectable({
  providedIn: 'root'
})
export class UsuarioDaoService implements usuarioDAOI {

  urlApi:string;

  constructor(private httpClient:HttpClient, private router:Router, private errorsManager:ErrorsManagerService) { 


    this.urlApi = `${environment.ipHiberus}/api/v1/users`
    

  }
  
  public async addUser(user:UsuarioDTO){

    let added = true
    await this.httpClient.post(this.urlApi, user).toPromise().catch(error => {
      this.errorsManager.onError(error); 
      added = false}
      );
    
    return added;
  }


  async deleteUser(id:string):Promise<boolean> {
    
    let deleted = true
    let urlDelete = `${this.urlApi}/${id}`;

    await this.httpClient.delete(urlDelete).toPromise().catch(error => {
      this.errorsManager.onError(error); 
      deleted = false}
      );
    
    return deleted;


  }
  
  async listUsers(): Promise<UsuarioDTO[]> {
    

    let dataUsers = await this.httpClient.get<any>(this.urlApi).toPromise();
    return dataUsers.items as Promise<UsuarioDTO[]>;

  }

  async findUser(id: string): Promise<UsuarioDTO> {
    
    let urlIdUser = `${this.urlApi}/${id}`;
    
    let dataUser = await this.httpClient.get<any>(urlIdUser).toPromise();

    return dataUser as Promise<UsuarioDTO>

  }

  async editUser(user:UsuarioDTO, idEditingUser:string): Promise<boolean> {
    
    let updated = true;
    let urlIdUser = `${this.urlApi}/${idEditingUser}`;
    
    let dataUser = await this.httpClient.put(urlIdUser, user).toPromise().catch(error => {
      this.errorsManager.onError(error); 
      updated = false}
      );
    
    return updated;
  }


 
}
