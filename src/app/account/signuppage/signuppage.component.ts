import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SessionStorageService } from 'ngx-webstorage';
//import { AuthService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterPayload } from 'src/app/services/auth/auth.interface';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.scss']
})

export class SignuppageComponent {

  passwordMismatch = false; //controle la validité du mot de passe
  hidePassword = false; //controle la vue du mot de passe
  registerPayload: RegisterPayload = {
    display_name: "",
    nonce: "",
    notify: "",
    email: "",
    username: "",
    user_pass: ""
  }
  signupForm2: FormGroup; //formulaire de la deuxième page
  constructor(private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private sessionStorage: SessionStorageService,
    private cookieService: CookieService,
    private router: Router
  ) {
  }


  async ngOnInit() {

    /* initialisation du formulaire de la deuxième page */
    this.signupForm2 = this.formBuilder.group({
      // nom: ["", Validators.required],
      // prenom: ["", Validators.required],
      nom_utilisateur: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$/)]],
      confirmPassword: ['', [Validators.required]],
      // language: ['fr', Validators.required],
    },
      {
        validators: this.passwordMatchValidator
      });

  }


  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  async onSignupfinale() {

    this.registerPayload.display_name = "test 1";
    this.registerPayload.email = this.signupForm2.value?.email;
    this.registerPayload.nonce = "";
    this.registerPayload.notify = "";
    this.registerPayload.username = this.signupForm2.value?.nom_utilisateur;
    this.registerPayload.user_pass = this.signupForm2.value?.password;

    //  console.log(this.signupForm2.value);
    this.AuthService.register(
      this.registerPayload
    );
  }
  annuler() {
    // localStorage.removeItem('CreateInfoUser') //on vide ses information du localstorage
  }

}
