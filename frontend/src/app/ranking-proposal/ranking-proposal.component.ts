import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { Session } from '../session';

@Component({
  selector: 'app-ranking-proposal',
  templateUrl: './ranking-proposal.component.html',
  styleUrls: ['./ranking-proposal.component.css']
})
export class RankingProposalComponent {
  
  session? : Session;

  constructor(private route: ActivatedRoute, private sessionService: SessionService, private router: Router){

  }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['sessionId'];
        this.sessionService.getSession(id).subscribe(
          (res) => {
            this.session = res;
          }
        )
      });
  }

  exit(){
    this.router.navigate(['/select-proposal']);
  }
}
