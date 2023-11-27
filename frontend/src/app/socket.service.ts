import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Activity } from './activity';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public message$: BehaviorSubject<{activity: Activity, position: number}> = new BehaviorSubject({activity:{title:'Esperando actividad', imgPath:''},position:-1});
  constructor() {} 

  socket = io('http://localhost:3000');

  /*
  public sendMessage(message: Activity) {
    this.socket.emit('message', message);
  }*/

  public getNewMessage = () => {
    this.socket.on('sendNewActivity', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };

}