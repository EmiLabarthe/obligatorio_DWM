import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from './proposal';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }
  private addAdminUrl = 'http://localhost:3000/api/login';
  
  

  postAdmin(admin: Admin): Observable<Admin> {
    
    console.log('Admin a enviar:', admin); // Verifica el objeto admin antes de enviarlo
    return this.http.post<Admin>(this.addAdminUrl, admin, this.httpOptions).pipe(
      tap((admin: Admin) => console.log(`Admin añadida con éxito, nombre: ${admin.name}`)),
      catchError(this.handleError<Admin>('postAdmin'))
    );
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }





}
