import { Component } from '@angular/core';
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { Session } from '../session';

@Component({
  selector: 'app-select-proposal',
  templateUrl: './select-proposal.component.html',
  styleUrls: ['./select-proposal.component.css']
})
export class SelectProposalComponent {

  constructor(private proposalService : ProposalService, private router: Router, private sessionService: SessionService){}

  proposals ?: Proposal[];

  selected?: Proposal;

  ngOnInit(){
    this.proposalService.getProposals().subscribe((data: Proposal[]) => {
      this.proposals = data;
    })
  }

  selectProposal(proposal: Proposal){
    this.selected = proposal;
  }

  removeSelection(){
    this.selected = undefined;
  }

  createSession(){
    if(this.selected){
      console.log('sending session for creation');
      this.sessionService.createSession(this.selected).subscribe(
        (response) => {
            this.router.navigate([`/proposal-lobby/${response._id}`]);
            
          }
        ,
        (error) => {
          console.log('Error creating new Session:', error);
        }
      );
    }
  }
}
