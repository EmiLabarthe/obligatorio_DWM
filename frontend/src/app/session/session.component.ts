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

  activities:Activity[] = [];
  position:number = 0;
  currentActivity:Activity = {title:'Actividad 9', imgPath:'', id:9};
  ngOnInit() {
    
    [0,1,2,3,4].forEach((index) =>{
      this.activities.push({title:'Actividad '+index, imgPath:'', id:index});
    });
    //Acá tengo que ver como manejamos esto, quiero cargar aca la proposal así quedan para ir enviando la actividad siguiente
    const proposal :Proposal= {title:'Propuesta 1', id:'0', activities:this.activities};
    proposal.activities.forEach((activity: Activity, index: number) => {
      setTimeout(() => {
        this.socketService.nextActivity(activity, index);
      }, index * 10000); // Cada 30 segundos, envía la siguiente actividad y el número de posición
    });

    //chart.js

    // Subscribe to the onDataEvent function to receive and use the emitted data
    this.socketService.onDataEvent().subscribe((receivedData) => {
      // Handle the received data here
      console.log('Received data:', receivedData);

      // You can update your UI or take any other actions with the data
    });



    /*
    this.socketService.onDataEvent((data) => {
       // Aca los datos que se pueden usar
      // Con activity podemos cambiar lo que ven en la pag
      // position lo guardo en una variable para el post
      this.position = data.position; 
      this.currentActivity = data.activity;
      console.log(data.position);
    });*/
  }



    
}
