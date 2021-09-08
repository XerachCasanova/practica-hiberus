import { HttpClient } from '@angular/common/http';
import { EventEmitter, Input, Output } from '@angular/core';
import { AfterViewInit, Component,  SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UsuarioDaoService } from '../DAO/usuarioDao.service';
import { UsuarioDTO } from '../DTO/UsuarioDTO';


import { UsuariosDataSource } from './list-users-datasource';

@Component({
  selector: 'app-listusers',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UsuarioDTO>;

  @Input() userList: UsuarioDTO[];
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<UsuarioDTO>();

  dataSource: UsuariosDataSource | null;
  //url: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'surname', 'email', 'edit', 'delete'];

  constructor(private httpClient:HttpClient, private usuarioDaoService:UsuarioDaoService) {
    
    this.userList = [];
    this.dataSource = null;


  }

  ngOnInit():void{

  }


  ngOnChanges(cambios:SimpleChanges){

    this.userList = cambios.userList.currentValue
    this.dataSource = new UsuariosDataSource(this.userList);

    if (this.dataSource.data.length > 0){
      this.getUsers();
 
    }
  }

 
  ngAfterViewInit(): void {

    this.getUsers();
    
  }

  async getUsers() {

    this.userList = await this.usuarioDaoService.listUsers();
    this.dataSource = new UsuariosDataSource(this.userList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

      
  }

  deleteUser(id:string){
    
    this.delete.emit(id);

  }

  updateUser(user:UsuarioDTO){

    this.update.emit(user);

  }

  
}
