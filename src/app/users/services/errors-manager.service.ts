import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsManagerService {

  constructor(private notifications:NotificationsService, private router:Router) { }

  onError(error:any){
    const codigo = 401;

    if(error instanceof HttpErrorResponse)
    {

      if(error.status == codigo) {

        this.router.navigate(["/usuarios"]);
        this.notifications.openSnackBar('Usuario no autenticado.');
      } else if(error.status==404){

        this.notifications.openSnackBar('Usuario no encontrado.');

      } else if(error.status==500){

        this.notifications.openSnackBar('Error en el servidor.');

      } else {

        this.notifications.openSnackBar('Error desconocido.');

      }
    }

  }

}
