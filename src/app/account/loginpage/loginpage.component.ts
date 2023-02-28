import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModalComponent } from 'src/app/loading-modal/loading-modal.component';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent {

  IsOnLogin:boolean 
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
     private AuthService:AuthService,
     private router: Router,
     private modalService: NgbModal
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
    await  this.AuthService.login(this.loginForm.value?.nom_utilisateur, this.loginForm.value?.password)
    this.IsOnLogin = false
  }
}
