import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SessionService } from '../session.service';
import { Session } from '../session';

@Component({
  selector: 'app-proposal-lobby',
  templateUrl: './proposal-lobby.component.html',
  styleUrls: ['./proposal-lobby.component.css']
})
export class ProposalLobbyComponent {

  session?: Session;

  constructor(private route: ActivatedRoute, private sessionService: SessionService) {}

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
}

