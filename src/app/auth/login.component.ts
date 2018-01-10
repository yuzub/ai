import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  pageTitle: string = 'Sign in';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(formValues) {
    console.log(formValues);
  }

  signInAnonymously(): void {
    this.authService.signInAnonymously()
      .then(() => this.postSignIn());
  }

  createOrSignInWithEmailAndPassword() {
    console.log('signInWithEmailPass() is not implemented yet');
  }

  signInWithFacebook(): void {
    this.authService.signInWithFacebook()
      .then(() => this.postSignIn());
  }

  signInWithGithub(): void {
    this.authService.signInWithGithub()
      .then(() => this.postSignIn());
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle()
      .then(() => this.postSignIn());
  }

  signInWithTwitter(): void {
    this.authService.signInWithTwitter()
      .then(() => this.postSignIn());
  }

  private postSignIn(): void {
    if (this.authService.redirectUrl) {
      this.router.navigateByUrl(this.authService.redirectUrl);
    } else {
      this.router.navigate(['/instructors']);
    }
  }

}
