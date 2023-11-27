import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from './session';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Proposal } from './proposal';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  private sessionUrl = 'http://localhost:3000/api/sessions';

  getSession(sessionId: string){
    console.log('buscando session con el ID:', sessionId);
    return this.http.get<Session>(`${this.sessionUrl}/${sessionId}`);
  }

  createSession(proposal: Proposal): Observable<Session> {
    console.log('session a crear con el ProposalID: ', proposal._id);
    return this.http.post<Session>(this.sessionUrl, {_id: proposal._id}, this.httpOptions).pipe(
      tap((session: Session) => console.log(`Session added successfully, data: ${session._id}`)),
      catchError(this.handleError<Session>('createSession'))
    );
  }

  startSession(sessionId: string, proposal: Proposal)
  {
    console.log('Empezar sesión '+sessionId);
    return this.http.post(`http://localhost:3000/sessions/start`, {proposal}, this.httpOptions).pipe(
      tap((data: any) => console.log(`Session started successfully, data: ${data.msg}`)),
      catchError(this.handleError<Session>('startSession'))
    );
  }

  getRanking(sessionId: string){
    console.log('buscando ranking de la session:', sessionId);
    return this.http.get<Object[]>(`${this.sessionUrl}/ranking/${sessionId}`);
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
