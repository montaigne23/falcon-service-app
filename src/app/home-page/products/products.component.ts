import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { TestserviceService } from 'src/app/services/testservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit{

  @Output() outputexemple: EventEmitter<any> = new EventEmitter()

  constructor(private _TestserviceService : TestserviceService){

  }
  sendData(){
    this._TestserviceService.totalData++;
    // this.outputexemple.emit(1.5)
  }
  sendData1(){
    this._TestserviceService.totalData1++;
    // this.outputexemple.emit(1.5)
  }

  ngOnInit(){
  }

}
