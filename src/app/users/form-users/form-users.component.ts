import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioDTO } from '../DTO/UsuarioDTO';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.css']
})
export class FormUsersComponent {

  @Output() create = new EventEmitter<{user: UsuarioDTO, idEditingUser: string}>();
  @Input() userToUpdate:UsuarioDTO | null

  userForm = this.fb.group({
    name: [null, Validators.required],
    surname: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
  });
  
  idUpdatingUser:string;
  isUpdating:boolean;
  nameActionForm:string;
  nameButtonAdd:string;
  showForm:boolean;
  


  constructor(private fb: FormBuilder) {

    this.showForm=false;
    this.idUpdatingUser = '';
    this.isUpdating = false;
    this.nameActionForm = 'Añadir usuario';
    this.nameButtonAdd = 'Añadir usuario';

     this.userToUpdate = null
     
   
  }

  ngOnChanges(cambios:SimpleChanges){
    
    console.log(cambios);
    if (cambios.userToUpdate && cambios.userToUpdate.currentValue != null){
      
      let user = cambios.userToUpdate.currentValue
      
      this.userForm.setValue({
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: ''
      })

      this.idUpdatingUser = user.id;

      this.isUpdating = true;
      this.nameActionForm = 'Guardar cambios';
      this.showForm = true;
      
    }

  }

  onSubmit(): void {

  
    let userData = new UsuarioDTO(
      this.userForm.controls.email.value, 
      this.userForm.controls.password.value, 
      this.userForm.controls.name.value, 
      this.userForm.controls.surname.value, 
      '')
    

    this.create.emit({user: userData, idEditingUser: this.idUpdatingUser});

    this.resetForm();
    
  }
  
 

  resetForm(){

    this.isUpdating = false;

    this.userForm.setValue({
      name: '',
      surname: '',
      email: '',
      password: '',
    })

    this.idUpdatingUser = '';
    this.nameActionForm = 'Añadir usuario';
    this.userFormShow();

  }

  userFormShow(){
    
    this.showForm = !this.showForm;

    this.showForm ? this.nameButtonAdd = 'Ocultar formulario':  this.nameButtonAdd = 'Añadir usuario';
  }
  
}
