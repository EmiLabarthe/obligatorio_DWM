import { Component } from '@angular/core';
import { ProposalService } from '../proposal.service';
import { Proposal } from '../proposal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-proposal',
  templateUrl: './select-proposal.component.html',
  styleUrls: ['./select-proposal.component.css']
})
export class SelectProposalComponent {

  constructor(private proposalService : ProposalService){}

  proposals ?: Proposal[];

  ngOnInit(){
    this.proposalService.getProposals().subscribe((data: Proposal[]) => {
      this.proposals = data;
    })
  }
  
}
