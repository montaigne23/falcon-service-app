import { Component,OnInit, Input } from '@angular/core';
import { TestserviceService } from '../services/testservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  @Input() inputexemple: any

  constructor(public _TestserviceService :TestserviceService){

  }
ngOnInit(){
  console.log(this._TestserviceService.totalData);
}
}
