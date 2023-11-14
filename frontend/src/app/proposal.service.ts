import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from './proposal';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ExampleInterceptorInterceptor } from './interceptor/interceptor';


@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private http: HttpClient, private exampleInterceptor: ExampleInterceptorInterceptor, private httpHandler: HttpHandler) { }
  private proposalUrl = 'http://localhost:3000/api/proposals';
  private addProposalUrl = 'http://localhost:3000/api/proposals';


  getProposals(): Observable<Proposal[]> {
    // Create a new HTTP request.
    //const request = new HttpRequest('GET', this.proposalUrl);
    
    // Intercept the request with your interceptor.
    //const interceptedRequest  = this.exampleInterceptor.intercept(request, this.httpHandler);
          return this.http.get<Proposal[]>(this.addProposalUrl
            )
        .pipe(
          tap(_ => console.log()),
          
          catchError(this.handleError<Proposal[]>('getPrososals', []))
        );
    }
  

getProposal(id: number): Observable < Proposal > {
  const url = `${this.proposalUrl}/${id}`;
  return this.http.get<Proposal>(url).pipe(
    tap(_ => console.log(`fetched proposal id=${id}`)),
    catchError(this.handleError<Proposal>(`getProposal id=${id}`))
  )
}

addProposal(proposal: Proposal): Observable < Proposal > {
  console.log('Propuesta a enviar:', proposal); // Verifica el objeto proposal antes de enviarlo
  return this.http.post<Proposal>(this.addProposalUrl, proposal, this.httpOptions).pipe(
    tap((proposal: Proposal) => console.log(`Propuesta añadida con éxito, nombre: ${proposal.title}`)),
    catchError(this.handleError<Proposal>('addProposal'))
  );
}


httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  private handleError<T>(operation = 'operation', result ?: T) {
  return (error: any): Observable<T> => {

      console.error(error);
      return of(result as T);
    };
  }




}
