import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Activity } from './activity';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public message$: BehaviorSubject<Activity> = new BehaviorSubject({title:'Esperando actividad', imgPath:''});
  constructor() {} 

  socket = io('http://localhost:3000');

  public sendMessage(message: Activity) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('sendNewActivity', (activity) =>{
      this.message$.next(activity);
    });
    
    return this.message$.asObservable();
  };

}