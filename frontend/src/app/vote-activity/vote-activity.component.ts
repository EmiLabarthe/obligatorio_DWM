import { Component, Input } from '@angular/core';
import { Activity } from '../activity';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote-activity',
  templateUrl: './vote-activity.component.html',
  styleUrls: ['./vote-activity.component.css']
})

export class VoteActivityComponent {
  currentActivity:Activity = {title:'Esperando actividad', imgPath:''};
  voto: boolean = false;
  constructor(private socketService: SocketService, private router: Router) {}
  activityPosition = -1;
  nickname = localStorage.getItem('nickname');
  
  onClick(reaction: number)
  {
    this.voto = false;
    
  }
  ngOnInit() {
    //chart.js
    this.socketService.getNewMessage().subscribe((message) => {
    this.currentActivity = message.activity;
    this.activityPosition = message.position;
    this.voto = this.activityPosition !=-1;
    if(this.currentActivity.title == "Terminó el juego" && this.activityPosition == -1)
    {
      this.router.navigate(['/ranking-proposal'])
    }
    })
  }
}
