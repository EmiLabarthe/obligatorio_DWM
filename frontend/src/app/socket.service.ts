import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Activity } from './activity';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public message$: BehaviorSubject<Activity> = new BehaviorSubject({title:'a', imgPath:''});
  constructor() {} 

  socket = io('http://localhost:3000');

  public sendMessage(message: Activity) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('sendNewActivity', (activity) =>{
      this.message$.next(activity);
      console.log('la actividad', activity);
    });
    
    return this.message$.asObservable();
  };

  // Envía la proxima actividad y su número de posición para poder usarlo para calificar
  public nextActivity( activity: Activity, position: number) {
    this.socket.emit('nextActivity', { activity, position });
    console.log("emitio")
  }  

}