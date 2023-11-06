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

  // Envpia la proxima actividad y su número de posición para poder usarlo para calificar
  public nextActivity( activity: Activity, position: number) {
    this.socket.emit('nextActivity', { activity, position });
    console.log("emitio")
  }
  
  /*
  // Escucha si se envía una actividad
  onActivity(callback: (data: { activity: Activity, position: number }) => void) {
    this.socket.on('nextActivity', callback);
    console.log('callback')
  }*/

  public onDataEvent() {
    return new Observable<any>((observer) => {
      this.socket.on('nextActivity', ({activity, position}) => {
        observer.next({activity, position});
        console.log("recibio  ")
      });
    });
  }

  

}