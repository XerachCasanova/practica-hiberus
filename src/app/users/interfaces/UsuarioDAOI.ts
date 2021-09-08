import { UsuarioDTO } from "../DTO/UsuarioDTO";

export interface usuarioDAOI{
  
  urlApi:string;

  addUser(user:UsuarioDTO):Promise<boolean>;
  deleteUser(id:string):Promise<boolean>;
  listUsers():Promise<UsuarioDTO[]>;
  findUser(id:string):Promise<UsuarioDTO>;
  editUser(user:UsuarioDTO, idEditingUser:string):Promise<boolean>;
}