import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ExampleInterceptorInterceptor implements HttpInterceptor {

    constructor() { }
        token: any;
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        this.token = JSON.parse(localStorage.getItem('jwt') || '{}');
        const reqCopy = request.clone()
        //can set new header
        reqCopy.headers.set("Authorization", "Bearer 12312323");

        return next.handle(reqCopy);

    }
}