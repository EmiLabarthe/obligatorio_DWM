import { Component, Input } from '@angular/core';
import { Activity } from '../activity';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote-activity',
  templateUrl: './vote-activity.component.html',
  styleUrls: ['./vote-activity.component.css']
})

export class VoteActivityComponent {
  currentActivity:Activity = {title:'Esperando actividad', imgPath:''};
  voto: boolean = false;
  sessionId: string = "";
  constructor(private socketService: SocketService, private router: Router, private route: ActivatedRoute) {}
  activityPosition = -1;
  nickname = localStorage.getItem('nickname');
  
  onClick(reaction: number)
  {
    this.voto = false;
    
  }
  ngOnInit() {
    // Get parameter from route
    this.route.params.subscribe(params => {
      // Accessing individual parameter values
      this.sessionId = params['sessionId']; // Change 'parameterName' to your actual parameter name      
    });

    this.socketService.getNewMessage().subscribe((message) => {
    this.currentActivity = message.activity;
    this.activityPosition = message.position;
    this.voto = this.activityPosition !=-1;
    if(this.currentActivity.title == "Terminó el juego" && this.activityPosition == -1)
    {
      this.router.navigate([`/ranking-proposal/${this.sessionId}`])
    }
    })
  }
}
