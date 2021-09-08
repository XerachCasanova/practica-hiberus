import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-shell',
  templateUrl: './users-shell.component.html',
  styleUrls: ['./users-shell.component.css']
})
export class UsersShellComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onLogout(){

    sessionStorage.removeItem('token');

    this.router.navigate(['/login']);
    
  }

}
