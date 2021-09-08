import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from '../login/services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router:Router, private notifications:NotificationsService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token  = sessionStorage.getItem('token');
    
    
    let modifiedRequest = req;

    if (token) {
    const tokenParsed = JSON.parse(token);
      
      modifiedRequest = req.clone({
        setHeaders: {
          authorization: `${tokenParsed.tokenType} ${ tokenParsed.accessToken }`
        }
      });
    }

    return next.handle(modifiedRequest).pipe(
      catchError(this.handleError.bind(this))
      );
  }

  private handleError(error:any)
  {
    const codigo = 401;
  

    if(error instanceof HttpErrorResponse)
    {

      if(error.status == codigo) {

        this.router.navigate(["/login"]);

      }
      if(error.status==500) {

        this.notifications.openSnackBar('Error en el servidor.');
        
      }
    }
  
    return throwError(error);
  }
  
}
 