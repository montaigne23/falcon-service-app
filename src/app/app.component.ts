import { Component, ElementRef, ViewChild, AfterViewInit, OnInit  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
 
export class AppComponent implements OnInit {
  title = 'falcon_service';
  
  @ViewChild("scroll") scroll: ElementRef ;
  public val = 1
  constructor(){

  }
  ngOnInit(){
  }

  scroolTop(){
    window.scroll(0,0)
  }
  onActivate(){
    window.scroll(0,0)
  }

  reciveData(val:any){
    this.val = val
    console.log(val +"  ok");
    
  }
}
