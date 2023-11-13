import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from './proposal';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private http: HttpClient) { }
  private proposalUrl = 'http://localhost:3000/api/proposals';
  private addProposalUrl = 'http://localhost:3000/api/proposal';


  getProposals(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(this.proposalUrl)
      .pipe(
        tap(_ => console.log('fetched proposals')),
        catchError(this.handleError<Proposal[]>('getProposals', []))
      );
  }

  getProposal(id: number): Observable<Proposal> {
    const url = `${this.proposalUrl}/${id}`;
    return this.http.get<Proposal>(url).pipe(
      tap(_ => console.log(`fetched proposal id=${id}`)),
      catchError(this.handleError<Proposal>(`getProposal id=${id}`))
    )
  }

  addProposal(proposal: Proposal): Observable<Proposal> {
    console.log('Propuesta a enviar:', proposal); // Verifica el objeto proposal antes de enviarlo
    return this.http.post<Proposal>(this.addProposalUrl, proposal, this.httpOptions).pipe(
      tap((proposal: Proposal) => console.log(`Propuesta añadida con éxito, nombre: ${proposal.title}`)),
      catchError(this.handleError<Proposal>('addProposal'))
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
