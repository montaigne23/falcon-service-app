import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.scss']
})

export class SignuppageComponent {

  passwordMismatch = false; //controle la validité du mot de passe
  hidePassword = false; //controle la vue du mot de passe

  signupForm2: FormGroup;//formulaire de la deuxième page
  private socket = io('https://real-timeapi-production.up.railway.app');
  // private socket = io('https://real-timeapi-production.up.railway.app');
  constructor(private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private sessionStorage: SessionStorageService,
    private cookieService: CookieService,
    private router: Router
  ) {
  }

 
  async ngOnInit() {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('receive-comment-700', (data) => {
      console.log('Received new comment:', data);
    });

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
  handleSendComment = () => {
    var sendCommentRequestDto = {
      post_id: 701,
      parent_id: 608,
      comment: "test",
      _comment: "comment", // TODO : Ajouter le Parseur des formules
    };
    this.socket.emit("send-comment", sendCommentRequestDto);
  };

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
    console.log(this.signupForm2.value);
    await this.AuthService.signupfinal(
      this.signupForm2.value?.password,
      this.signupForm2.value?.email,
      this.signupForm2.value?.nom_utilisateur,
    );
  }
  testsocket() {
    this.socket.on('send-comment', () => {
      console.log('Connected to WebSocket server');
    });

  }

  annuler() {
    // localStorage.removeItem('CreateInfoUser') //on vide ses information du localstorage
  }

}
