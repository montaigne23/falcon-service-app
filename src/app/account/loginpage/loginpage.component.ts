import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent {


  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
     private AuthService:AuthService,
     private router: Router
     ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onLogin() {

    console.log(this.loginForm.value?.email);
  await  this.AuthService.login(this.loginForm.value?.email, this.loginForm.value?.password);
    this.router.navigate(['/home']);

  }
}
