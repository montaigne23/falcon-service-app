import { Component, ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmsignup',
  templateUrl: './confirmsignup.component.html',
  styleUrls: ['./confirmsignup.component.scss']
})
export class ConfirmsignupComponent {
  passwordMismatch = false; //controle la validité du mot de passe
  hidePassword = false; //controle la vue du mot de passe
  currentIndex = 0; //premet de basculer entre la première page d'inscription et la deuxième page d'inscription
  info_user : any //récupère les information de l'utilisateur venant du serveur, après qu'il est appuyé sur suivant

  signupForm2: FormGroup;//formulaire de la deuxième page

  constructor(private formBuilder: FormBuilder,
    private AuthService:AuthService,
    private sessionStorage: SessionStorageService,
    private cookieService: CookieService,
    private router: Router
    ) {
     }
  

     async ngOnInit() {
      /* initialisation du formulaire de la deuxième page */
      this.signupForm2 = this.formBuilder.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      nom_utilisateur: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ['', [Validators.required,  Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$/)]],
      confirmPassword: ['',[ Validators.required]],
      language: ['fr', Validators.required],
  },
  {
    validators: this.passwordMatchValidator
  });

      /* Ici on vérifie qu'il ya pas une inscription encour et doit être achevé ou annuler
    si tel est le cas on bascule directement sur la deuxième page d'inscription et on initialise 
    le formulaire avec les informations encour de l'inscription dans le cas contraire on ne fait rien 
    et la première page d'incription s'affiche */
  if ( await localStorage.getItem("CreateInfoUser")) {
    var t : any = await localStorage.getItem("CreateInfoUser")
    var data = JSON.parse(t)
    if(data?.status===1){
      let nom = this.signupForm2.get("nom")
      let prenom = this.signupForm2.get("prenom")
      let email = this.signupForm2.get("email")
      email?.setValue(data?.email)
      prenom?.setValue(data?.lastname)
      nom?.setValue(data?.firstname)
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



  /* Ici on confirme l'utilisateur crée et on récupère ses information 
  que on va ensuite stocké dans un cookie, puis on éfface du localstorage
   les information de l'utilisateur précédemment ajouté lors de la vérification 
   de l'utilisateur  */

  async onSignupfinale() {
    console.log(this.AuthService._info_user);
    await this.AuthService.signupfinal(
      this.signupForm2.value?.password,
      this.signupForm2.value?.nom,
      this.signupForm2.value?.prenom,
      this.AuthService._info_user.registerToken 
    );

    localStorage.removeItem('CreateInfoUser') //on vide ses information du localstorage
    
    this.AuthService._info_user = { // et on initialise la variable tempon
      status:0,
       id: null,
        email:"ok",
        firstname:"ok",
        lastname:"ok",
        registerToken:""
      }

      this.router.navigate(['/home']); //et on navigue vers la page d'accueil
   // console.log(this.signupForm2.value);
  }


  annuler(){

    localStorage.removeItem('CreateInfoUser') //on vide ses information du localstorage
  }

}
