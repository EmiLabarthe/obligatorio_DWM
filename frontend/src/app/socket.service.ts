import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Activity } from './activity';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {} 

  socket = io('http://localhost:3000');

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
      console.log(message);
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