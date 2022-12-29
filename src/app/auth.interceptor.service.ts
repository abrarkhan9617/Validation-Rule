import { TokenserviceService } from './tokenservice.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, catchError, Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private Router: Router, private token: TokenserviceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(

      catchError(error => {
        if (error.status == 401) {
          this.Router.navigate(['']).then(_ =>
            alert("Session Expired You Must Login"))
        }
        return throwError(error);
      })
    )



  }
}
