import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  @Output() outputexemple: EventEmitter<any> = new EventEmitter()
  @Output() outputexemple1: EventEmitter<any> = new EventEmitter()
  
  public val = 5
  constructor(){
    
  }
  ngOnInit(){
    this.val = 8
  }
  
  reciveData(val:any){
    this.val = val
     console.log(val);
     this.outputexemple.emit(this.val)
  }
  
  sendData(){
  }
}
