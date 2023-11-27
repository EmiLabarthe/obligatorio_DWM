import { Component, Input } from '@angular/core';
import { Activity } from '../activity';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-vote-activity',
  templateUrl: './vote-activity.component.html',
  styleUrls: ['./vote-activity.component.css']
})

export class VoteActivityComponent {
  currentActivity:Activity = {title:'Esperando actividad', imgPath:''};
  voto: boolean = false;
  sessionId: string = "";
  constructor(private socketService: SocketService, private router: Router, private route: ActivatedRoute, private sessionService: SessionService) {}
  activityPosition = -1;
  nickname = "prueba";
  
  onClick(reaction: number)
  {
    console.log("Se votó: "+this.nickname+" en"+this.sessionId)
    this.voto = false;
    this.sessionService.postReaction(this.sessionId, this.nickname, this.currentActivity.title, reaction).subscribe();
  }
  ngOnInit() {
    var nick =  localStorage.getItem('nickname');
    if(nick != null)
    {
      this.nickname = nick;
    }
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
