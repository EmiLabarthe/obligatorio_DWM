import { Component, OnInit } from '@angular/core';
import { SocketService } from './../socket.service';
import { Proposal } from '../proposal';
import { Activity } from '../activity';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit{

  constructor(private socketService: SocketService) {}

  currentActivity:Activity = {title:'Actividad 9', imgPath:''};
  ngOnInit() {
    //chart.js
    this.socketService.getNewMessage().subscribe((activity:Activity) => {
      console.log(activity.title);
      this.currentActivity = activity;
    })
    
  }



    
}
