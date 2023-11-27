import { Component } from '@angular/core';
import { SocketService } from '../socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../activity';

@Component({
  selector: 'app-guest-wait',
  templateUrl: './guest-wait.component.html',
  styleUrls: ['./guest-wait.component.css']
})
export class GuestWaitComponent {

    currentActivity:Activity = {title:'Esperando actividad', imgPath:''};
    voto: boolean = false;
    sessionId: string = "";
    constructor(private socketService: SocketService, private router: Router, private route: ActivatedRoute) {}
    activityPosition = -1;
  
    nickname?: string | null;

    ngOnInit(): void {
      this.nickname = localStorage.getItem('nickname');
      this.route.params.subscribe(params => {
        this.sessionId = params['sessionId'];    
        
        this.socketService.getNewMessage().subscribe((message) => {
          if(message.activity.title != "Esperando actividad"){
            this.router.navigate([`/vote-activity/${this.sessionId}`])
          }
          this.currentActivity = message.activity;
          this.activityPosition = message.position;
          this.voto = this.activityPosition !=-1;
          if(this.currentActivity.title == "Terminó el juego" && this.activityPosition == -1)
          {
            this.router.navigate([`/ranking-proposal/${this.sessionId}`])
          }
      })
      }); 

      
  }
}
