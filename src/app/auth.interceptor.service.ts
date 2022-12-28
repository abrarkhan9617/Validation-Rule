import { TokenserviceService } from './tokenservice.service';
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError, catchError, Observable, map } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private Router: Router, private token: TokenserviceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(

      catchError(error => {
        if (error.status == 401) {
          this.token.getNewAccesToken().subscribe(data => {
            this.token.setAccessToken(data[Object.keys(data).at(Object.keys(data).findIndex((key) => key === 'access_token'))?.toString()! as keyof object])
          },
            (error) => {
              if (error.status == 400 && error.error.error == "invalid_grant") {
                this.Router.navigate(['']).then(_ =>
                  alert("Session Expired You Must Login"))
              }
            })
        }
        return throwError(error);
      })
    )



  }
}
