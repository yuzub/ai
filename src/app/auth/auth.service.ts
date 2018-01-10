import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { User, IUser } from "./user";

@Injectable()
export class AuthService {
  // Now we need to create an authentication service that will use the custom user class, rather than the standard Firebase auth data. We do this by calling switchMap on the authState observable in AngularFire2. If the user is not already saved the database, we create a new User with the default reader role. Once we have the standard auth data from Firebase, we set it to a BehaviorSubject that can be observed throughout the application.
  user: BehaviorSubject<User> = new BehaviorSubject(null)
  isAdmin$: Observable<boolean>;

  user$: Observable<firebase.User>;

  authenticated$: Observable<boolean>;
  uid$: Observable<string>;
  displayName$: Observable<string>;

  redirectUrl: string;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
    // AngularFireAuth.authState provides you an Observable<firebase.User> to monitor your application's authentication State.
    this.user$ = afAuth.authState;
    this.authenticated$ = afAuth.authState.map(user => !!user);
    this.uid$ = afAuth.authState.map(user => (user) ? user.uid : '');
    this.displayName$ = afAuth.authState.map(user => (user) ? user.displayName : '');

    // this.afAuth.authState
    //   .subscribe(auth => {
    //     if (auth == null) {
    //       console.log("Logged out");
    //       this.isLoggedIn = false;
    //       this.user_displayName = '';
    //       this.user_uid = '';
    //       this.router.navigate(['login']);
    //     } else {
    //       this.isLoggedIn = true;
    //       this.user_displayName = auth.google.displayName;
    //       this.user_uid = auth.google.email;
    //       console.log("Logged in");
    //       console.log(auth);
    //       this.router.navigate(['']);
    //     }
    //   });

    this.afAuth.authState
      .switchMap(auth => {
        if (auth) {
          /// signed in
          console.log('switchMap() -> signed in');
          // console.log(auth); // Bk {A: Array(0), G: "AIzaSyDTkUPX3aZjYJe8sGLFX1pTXdMbKC1TN1c", o: "[DEFAULT]", w: "instructor-dp-ua.firebaseapp.com", c: Ch, …}
          return this.afDb.object<IUser>('users/' + auth.uid).valueChanges();
        } else {
          /// not signed in
          console.log('switchMap() -> not signed in');
          // console.log(auth); // null
          return Observable.of(null)
        }
      })
      .subscribe(user => {
        console.log(`switchMap().subscribe (user) ->`);
        // console.log(user); // null | {displayName: "...", photoURL: "...png", roles: {…}, uid: "..."}
        this.user.next(user);
        // console.log(this.user); // BehaviorSubject {_isScalar: false, observers: Array(0), ... | BehaviorSubject {_isScalar: false, observers: Array(1), ...
      });

    // this.user
    // .map(user => {
    //   /// Set an array of user roles, ie ['admin', 'author', ...]
    //   console.log(user); // null | {displayName: "...", photoURL: "...png", roles: {…}, uid: "..."}
    //   this.isAdmin = (user && user.hasOwnProperty('roles') && user.roles.hasOwnProperty('admin'));
    // })
    // .subscribe()

    this.isAdmin$ = this.user.map(user => (user && user.roles) ? user.roles.admin : false);
    this.isAdmin$.subscribe(isAdmin => console.log(isAdmin));
  }

  // AngularFireAuth.auth returns an initialized firebase.auth.Auth instance, allowing you to log users in, out, etc.

  signIn(provider: firebase.auth.AuthProvider): Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        // console.log(credential);
        this.updateUser(credential.user);
      })
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

  //// Update user data in database ////
  /// updates database with user info after login
  /// only runs if user role is not already defined in database
  private updateUser(authData) {
    const userData = new User(authData);
    const ref = this.afDb.object<IUser>(`users/${authData.uid}`);
    ref.valueChanges()
      .take(1)
      .subscribe(user => {
        if (!user || !user.roles) { /// only runs if user or user.roles is not already defined in database
          ref.update(userData);
        }
      })
  }

  signInAnonymously(): Promise<any> {
    return this.afAuth.auth.signInAnonymously()
      .catch(error => console.log('ERROR @ AuthService#signInAnonymously() :', error));
  }

  //// Authenticate with Firebase using Password-Based Accounts using Javascript
  //// https://firebase.google.com/docs/auth/web/password-auth

  createUserWithEmailAndPassword(email, password): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(error => {
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
      .then(_ => this.router.navigateByUrl('/welcome'))
      .catch(error => console.log('logout error: ' + error));
  }
}
