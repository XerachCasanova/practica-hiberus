import { UsuarioI } from "../interfaces/UsuariosI";



export class UsuarioDTO  implements UsuarioI{
  name: string;
  surname: string;
  email: string;
  password: string;
  id: string;

  constructor(email:string, password:string, name:string, surname:string, id:string){

    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password= password;
    this.id = id;
  }

  getId(){
    return this.name;
  }

  getName(){
    return this.name;
  }

  getSurname(){

    return this.surname;
  }

  getEmail(){

    return this.email;
  }

  getPassword(){

    return this.password;

  }

  setId(name:string){

    this.name = name;

  }
  
  setName(name:string){

    this.name = name;

  }

  setSurname(surname:string){

    this.surname = surname;

  }

  setEmail(email:string){

    this.email = email;

  }

  setPassword(password:string){

    this.password= password;

  }

}

