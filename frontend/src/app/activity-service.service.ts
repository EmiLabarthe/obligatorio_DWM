import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from './activity';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActivityServiceService {

  constructor(private http: HttpClient, private httpHandler: HttpHandler) { }
  private activityUrl = 'http://localhost:3000/api/activities';
  private postActivityUrl = 'http://localhost:3000/api/activities';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activityUrl)
      .pipe(
        tap(_ => console.log('fetched activities')),
        catchError(this.handleError<Activity[]>('getActivities', []))
      );
  }
  getActivity(id: number): Observable<Activity> {
    const url = `${this.activityUrl}/${id}`;
    return this.http.get<Activity>(url).pipe(
      tap(_ => console.log(`fetched activity id=${id}`)),
      catchError(this.handleError<Activity>(`getProposal id=${id}`))
    )
  }
 
  postActivity(activity: Activity) {
    const requestBody = {
        title: activity.title,
        imgPath: activity.imgPath
    };
    console.log('Request Payload:', requestBody);

    this.http.post<Activity>(this.postActivityUrl, requestBody, this.httpOptions);
    
}


  

  private handleError<T>(operation = 'operation', result?: T) {
    console.log(operation+ "no nada");
    return (error: any): Observable<T> => {

      console.error(error); 

      return of(result as T);
    };
  }




}
