import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { AuthService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModalComponent } from 'src/app/loading-modal/loading-modal.component';
import { LoginPayload } from 'src/app/services/auth/auth.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent {

  IsOnLogin:boolean 
  loginForm: FormGroup;
  loginPayload: LoginPayload = {
    username: 'john_doe',
    password: 'my_secret_password'
  };
  constructor(
    private formBuilder: FormBuilder,
     //private AuthService:AuthService,
     private router: Router,
     private modalService: NgbModal,
    private authService: AuthService  

     ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nom_utilisateur: ["", Validators.required],
            password: ['', [Validators.required]]
    });
  }

  // public openLoadingModal() {
  //   const modalRef = this.modalService.open(LoadingModalComponent, { backdrop: 'static', keyboard: false });
  // }

  // public closeLoadingModal() {
  //   this.modalService.dismissAll();
  // }

  async onLogin() {
    this.IsOnLogin = true
    console.log(this.loginForm.value);
    this.loginPayload.password = this.loginForm.value?.password
    this.loginPayload.username = this.loginForm.value?.nom_utilisateur
    this.authService.login(this.loginPayload)
    this.IsOnLogin = false
  }
}
