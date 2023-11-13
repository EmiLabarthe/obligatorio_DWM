import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../proposal';

@Injectable()
export class ExampleInterceptorInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = JSON.parse(localStorage.getItem('jwt') || '{}');
        const reqCopy = request.clone({
          setHeaders: {
            Authorization: token
          }
          
        });
      console.log("header "+reqCopy.headers.getAll('Authorization'));
        return next.handle(reqCopy);
      }
}