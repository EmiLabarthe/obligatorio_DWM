import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SessionService } from '../session.service';
import { Session } from '../session';
import { Router } from '@angular/router';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal-lobby',
  templateUrl: './proposal-lobby.component.html',
  styleUrls: ['./proposal-lobby.component.css']
})
export class ProposalLobbyComponent {

  session?: Session;

  constructor(private route: ActivatedRoute, private sessionService: SessionService, private proposalService: ProposalService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['proposalId'];
        this.sessionService.getSession(id).subscribe(
          (res) => {
            this.session = res;
          }
        )
      });
  }

  cancelSession(){
    this.router.navigate(['/select-proposal']);
  }

  //MOCK PLAYERS
  players = [
    {name: "pepe"},
    {name: "juan"},
    {name: "Magrini"},
    {name: "paul neck"},
    {name: "brian sarmiento"},
    {name: "pepe"},
    {name: "juan"},
    {name: "El tony"},
    {name: "paul neck"},
    {name: "brian sarmiento"},
    {name: "sable"},
    {name: "juan"},
    {name: "alejo"},
    {name: "paul neck"},
    {name: "brian sarmiento"},
    {mame: "carlitos tevez"},
    {mame: "ROMAN"}
  ]

  startSession(){
    if(this.session){
      this.sessionService.startSession(this.session._id, this.session.proposal).subscribe();
      this.router.navigate(['/vote-activity']);
    }
  }
}

