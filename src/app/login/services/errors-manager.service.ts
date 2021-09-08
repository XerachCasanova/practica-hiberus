import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsManagerService {

  constructor(private notifications:NotificationsService) { }

  onError(error:any){
    const error_no_existe = 404;
    if(error instanceof HttpErrorResponse)
    {
      if(error.status == error_no_existe){
        this.notifications.openSnackBar('Email o password incorrectos.');
      }
      else if (error.status == 409){
        this.notifications.openSnackBar('Email o password incorrectos.');
      }
      else if (error.status == 601) {
        this.notifications.openSnackBar('Usuario no validado.');
      } else {

        this.notifications.openSnackBar('Error desconocido.');
      }
    }
  }

}
