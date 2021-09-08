import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioDaoService } from '../DAO/usuarioDao.service';
import { UsuarioDTO } from '../DTO/UsuarioDTO';



@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  userList:UsuarioDTO[]=[];
  userToUpdate:UsuarioDTO | null;
  notifications:string;
  
  constructor(private usuarioDaoService:UsuarioDaoService, private _snackBar:MatSnackBar) { 
    this.notifications='';
    this.userToUpdate = null;
    

  }

  ngOnInit(): void {  
    
    
  }

  async createUser(dataForm:any){

    const mongoose = require('mongoose');
    const id = mongoose.Types.ObjectId()

    if(dataForm.idEditingUser == ''){
      
      let isAdded = false;

      dataForm.user.id = id.toString();

      this.usuarioDaoService.addUser(dataForm.user);

      if(isAdded) { 

        this.userList = await this.usuarioDaoService.listUsers();

        this.openSnackBar('Usuario añadido correctamente.')

      };

    } else {

      let isUpdated = false;

      isUpdated = await this.usuarioDaoService.editUser(dataForm.user, dataForm.idEditingUser);
      if(isUpdated) { 

        this.userList = await this.usuarioDaoService.listUsers() 

        this.openSnackBar('Usuario modificado correctamente.')
      
      };

    }

    this.userList = await this.usuarioDaoService.listUsers();

  }

  updateUser(user: UsuarioDTO){
    

    //this.userToUpdate = user;
    
    //this.userToUpdate = {...user};

    //Envío un nuevo objeto siempre para que el componente del formulario detecte siempre cualquier cambio.
    this.userToUpdate = new UsuarioDTO(user.email, user.password, user.name, user.surname, user.id);
  

  }

  async deleteUser(id:string){
    let isDeleted = false;

    isDeleted = await this.usuarioDaoService.deleteUser(id);
    
    if(isDeleted) { 

      this.userList = await this.usuarioDaoService.listUsers();
      this.openSnackBar('Usuario eliminado correctamente.');
    
    }

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 5000});
  }

 
}

