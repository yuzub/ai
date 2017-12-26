import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {


  user$: Observable<firebase.User>;

  authenticated$: Observable<boolean>;
  uid$: Observable<string>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    // AngularFireAuth.authState provides you an Observable<firebase.User> to monitor your application's authentication State.
    this.user$ = afAuth.authState;
    this.uid$ = this.user$.map(user => user.uid);

    // AngularFireAuth.auth returns an initialized firebase.auth.Auth instance, allowing you to log users in, out, etc.
    this.authenticated$ = afAuth.authState.map(user => !!user);
  }


  currentUser: any;
  loginUser(userName: string, password: string): void {
    this.currentUser = {
      userName: userName,
      password: password
    }
  }
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(user => {
        console.log(user);
        this.router.navigate(['/instructors']);
      })
      .catch(error => console.log('auth error: ', error));
  }

  logout(): void {
    this.afAuth.auth.signOut()
      .then(_ => this.router.navigate(['/welcome']))
      .catch(error => console.log('logout error: ' + error));
  }

  signIn(provider: firebase.auth.AuthProvider): Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider)
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

  signInAnonymously(): Promise<any> {
    return this.afAuth.auth.signInAnonymously()
      .catch(error => console.log('ERROR @ AuthService#signInAnonymously() :', error));
  }

  // Authenticate with Firebase using Password-Based Accounts using Javascript
  // https://firebase.google.com/docs/auth/web/password-auth

  createUserWithEmailAndPassword(email, password): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword (email, password).catch(error => {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // For a list of error codes have a look at the Auth Reference Docs: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
      console.log('ERROR @ AuthService#createUserWithEmailAndPassword() :', error);
    });
  }

  signInWithEmailAndPassword(email, password): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // For a list of error codes have a look at the Auth Reference Docs: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithEmailAndPassword
      console.log('ERROR @ AuthService#signInWithEmailAndPassword() :', error);
    });
  }

  signInWithGithub(): Promise<any> {
    return this.signIn(new firebase.auth.GithubAuthProvider());
  }

  signInWithGoogle(): Promise<any> {
    return this.signIn(new firebase.auth.GoogleAuthProvider());
  }

  signInWithTwitter(): Promise<any> {
    return this.signIn(new firebase.auth.TwitterAuthProvider());
  }

  signInWithFacebook(): Promise<any> {
    return this.signIn(new firebase.auth.FacebookAuthProvider());
  }

  signOut(): void {
    this.afAuth.auth.signOut()
      .then(_ => this.router.navigate(['/welcome']))
      .catch(error => console.log('logout error: ' + error));
  }
}
