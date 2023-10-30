import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from './activity';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActivityServiceService {

  constructor(private http: HttpClient) { }
  private activitylUrl = 'http://localhost:3000/api/activities';


  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activitylUrl)
      .pipe(
        tap(_ => console.log('fetched activities')),
        catchError(this.handleError<Activity[]>('getActivities', []))
      );
  }
  getActivity(id: number): Observable<Activity> {
    const url = `${this.activitylUrl}/${id}`;
    return this.http.get<Activity>(url).pipe(
      tap(_ => console.log(`fetched activity id=${id}`)),
      catchError(this.handleError<Activity>(`getProposal id=${id}`))
    )
  }
  addProposal(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.activitylUrl, activity, this.httpOptions).pipe(
      tap((newActivity: Activity) => console.log(`added activity w/ id=${newActivity}`)),
      catchError(this.handleError<Activity>('addActivity'))
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
