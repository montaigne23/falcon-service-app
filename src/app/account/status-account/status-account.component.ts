import { Component,OnChanges, SimpleChanges,OnInit } from '@angular/core';

@Component({
  selector: 'app-status-account',
  templateUrl: './status-account.component.html',
  styleUrls: ['./status-account.component.scss']
})
export class StatusAccountComponent implements OnInit {
  init:number = 0;
  constructor(){
    console.log(1);

  }
  ngOnInit(){
    
  }
  increment(){
    this.init += 1
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // Code à exécuter lorsqu'il y a un changement dans la variable d'entrée
    console.log(this.init);
  }

}
