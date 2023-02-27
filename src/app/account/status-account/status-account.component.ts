import { Component,OnChanges, SimpleChanges,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-status-account',
  templateUrl: './status-account.component.html',
  styleUrls: ['./status-account.component.scss']
})
export class StatusAccountComponent implements OnInit {
  init:number = 0;
  IsUserInfo:any;
  IsToken : string;
  name:string
  constructor(private AuthService: AuthService, private toastr: ToastrService){
    console.log(1);
    // this.toastr.success('Your notification message', 'Title', { timeOut: 3000 });
  }
  ngOnInit(){
    
  }
  increment(){
    this.init += 1
  }
  getInfo(){
    this.IsToken = this.AuthService.getToken()
    this.IsUserInfo = this.AuthService.getUUserInfo();
    if (this.IsToken) {
    }
    if (this.IsUserInfo) {
      console.log(JSON.parse(this.IsUserInfo));
      
      this.name = JSON.parse(this.IsUserInfo).firstname
    }
    
  }
  ngOnChanges(changes: SimpleChanges) {
    // Code à exécuter lorsqu'il y a un changement dans la variable d'entrée
    console.log(this.init);
  }
logout(){
 this.AuthService.logout();
}
}


