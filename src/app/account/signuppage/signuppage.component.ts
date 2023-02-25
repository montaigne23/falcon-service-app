import { Component, ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.scss']
})

export class SignuppageComponent {

  passwordMismatch = false; //controle la validité du mot de passe
  hidePassword = false; //controle la vue du mot de passe
  currentIndex = 0; //premet de basculer entre la première page d'inscription et la deuxième page d'inscription
  info_user : any //récupère les information de l'utilisateur venant du serveur, après qu'il est appuyé sur suivant
  signupForm: FormGroup; //formulaire de la première page
  signupForm2: FormGroup;//formulaire de la deuxième page
  constructor(private formBuilder: FormBuilder,
    private AuthService:AuthService,
    private sessionStorage: SessionStorageService,
    private cookieService: CookieService,
    private router: Router
    ) {
     }
  
  ngOnInit() {

    /* initialisation du formulaire de la première page */
    this.signupForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    /* Ici on vérifie qu'il ya pas une inscription encour et doit être achevé ou annuler
    si tel est le cas on bascule directement sur la deuxième page d'inscription et on initialise 
    le formulaire avec les informations encour de l'inscription dans le cas contraire on ne fait rien 
    et la première page d'incription s'affiche */
    if (localStorage.getItem("CreateInfoUser")) {
      var t : any = localStorage.getItem("CreateInfoUser")
      var data = JSON.parse(t)
      if(data?.status===1){
        this.currentIndex = data?.status
      }
      console.log(this.AuthService._info_user=data);
    }

  }

  //cette fonction vérifie que les deux mots de passe sont identiques du mot de passse
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
  
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  /* Cette fonction permet de passer de la première à la deuxième page d'incription */
  async onSignup() {
    /* ici on cree un nouveau utilisateur non confirmé et on recupère son token */
    this.info_user = await this.AuthService.signup(
       this.signupForm.value?.email,
      this.signupForm.value?.nom,
      this.signupForm.value?.prenom,
    );
    console.log(this.info_user);
    console.log(this.info_user?.data.registrationToken);
    
    /*Ici on vérifie que l'utilisateur a bien été crée et on recupère ses informations
    que on va ensuite initialiser dans le deuxième formulaire d'inscription et les stocké dans le localstorage
     */
    this.AuthService.getlinkaccessuser(this.info_user?.data.registrationToken).subscribe(data => {
     let datas:any = data
      this.AuthService._info_user.email = datas?.data.email;
      this.AuthService._info_user.firstname = datas?.data.firstname;
      this.AuthService._info_user.lastname = datas?.data.lastname;
      this.AuthService._info_user.id = this.info_user?.data.id;
      this.AuthService._info_user.registerToken = this.info_user?.data.registrationToken;
      this.AuthService._info_user.status = 1;
      console.log(this.AuthService._info_user );
      this.currentIndex = 1;
      localStorage.setItem('CreateInfoUser', JSON.stringify(this.AuthService._info_user)); // Stocke le token JWT dans un cookie nommé 'jwt'
    });
  }

  /* Ici on confirme l'utilisateur crée et on récupère ses information 
  que on va ensuite stocké dans un cookie, puis on éfface du localstorage
   les information de l'utilisateur précédemment ajouté lors de la vérification 
   de l'utilisateur  */

  /**
   * cette fonction sert a annuler l'inscription
   */
  annuler(){

  }
}
