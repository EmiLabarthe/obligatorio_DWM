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
    this.nickname;
  }
  ngOnInit() {
    //chart.js
    this.socketService.getNewMessage().subscribe((activity:Activity) => {
    this.currentActivity = activity;
    this.voto = activity.title != "Terminó el juego" && activity.title != "Esperando actividad";
    this.activityPosition += 1;
    if(activity.title == "Terminó el juego")
    {
      this.router.navigate(['/ranking-proposal'])
    }
    })
  }
}
