import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking-proposal',
  templateUrl: './ranking-proposal.component.html',
  styleUrls: ['./ranking-proposal.component.css']
})
export class RankingProposalComponent {


  constructor(private router: Router){
  }

  exit(){
    this.router.navigate(['/select-proposal']);
  }
}
