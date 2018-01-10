import { auth } from "firebase/app";

// It’s not possible to add new properties directly to the Firebase auth object, but we can add custom data to the database. Below is a custom User model that uses a typescript interface to define the roles on the user. When a new user is created, we give them a default role level of reader.

export interface IRoles {
  reader: boolean;
  author?: boolean;
  admin?: boolean;
  // or:
  // subscriber?: boolean;
  // editor?: boolean;
  // admin?: boolean;
}

export interface IUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  roles: IRoles;
}

export class User implements IUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  roles: IRoles;

  constructor(authData) {
    this.uid = authData.uid;
    this.displayName = authData.displayName;
    this.email = authData.email;
    this.photoURL = authData.photoURL;
    this.roles = { reader: true };
  }
}


// Admin: Can edit or delete any post.
// Author: Can edit posts.
// Reader: Can only read data

/* Once you have assigned roles to your Firebase users, you have at least 4 different ways to restrict access in Angular. We will cover all four of these strategies in this lesson.

1. Hide HTML elements based on role.
2. Prevent actions based on role.
3. Restrict routes based on role with Angular Router Guards.
4. Create backend Firebase database rules.

2. Creating Authorization rules
In this example, authorization rules are defined in the PostService, however, you might consider defining them in their own dedicated service if they are used extensively throughout your Angular app. The service retrieves the user’s roles from Firebase, then maps them to an array that looks like ['reader', 'author'].

Here’s how a basic rule looks. This can be used to (1) hide elements in the HTML (2) prevent actions for firing.

Authorization Rule Example
A rules defines all the allowed roles, then returns a boolean. We also create a helper that uses Lodash to determine if allowed roles match any of the user’s roles.

/// the rule
get canEdit(): boolean {
  const allowed = ['admin', 'author']
  return this.matchingRole(allowed)
}
/// Determine if any matching roles exist
private matchingRole(allowedRoles): boolean {
  return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
}


Authorization Rule used in HTML
A simple way to prevent action from taking place is to hide the HTML element that uses it. For example, if we have button that will edit a post, we can simply remove it from the DOM with *ngIf.

<button *ngIf="postService.canEdit" (click)="editPost()">
  Edit Post
</button>


Authorization Rule used in TypeScript
What if you want to keep the button in the DOM? To prevent an action in TypeScript, you can use the rule with an if statement.

editPost(post, newData) {
  if ( this.canEdit ) {
    return this.db.object('posts/' + post.$key).update(newData)
  }
  else console.log('action prevented!')
}


Full post.service.ts
Here’s the full Angular service code and role-based authorization logic.

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../core/auth.service';
import * as _ from 'lodash'
@Injectable()
export class PostService {
  userRoles: Array<string>; // roles of currently logged in uer
  constructor(private auth: AuthService,
              private db: AngularFireDatabase) {
                auth.user.map(user => {
                  /// Set an array of user roles, ie ['admin', 'author', ...]
                  return this.userRoles = _.keys(_.get(user, 'roles'))
                })
                .subscribe()
              }
  /// Get Data
  getPosts() {
    return this.db.list('posts')
  }
  getPost(key) {
    return this.db.object('posts/' + key)
  }
  ///// Authorization Logic /////
  get canRead(): boolean {
    const allowed = ['admin', 'author', 'reader']
    return this.matchingRole(allowed)
  }
  get canEdit(): boolean {
    const allowed = ['admin', 'author']
    return this.matchingRole(allowed)
  }
  get canDelete(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }
  /// Helper to determine if any matching roles exist
  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }
  //// User Actions
  editPost(post, newData) {
    if ( this.canEdit ) {
      return this.db.object('posts/' + post.$key).update(newData)
    }
    else console.log('action prevented!')
  }
  deletePost(key) {
    if ( this.canDelete ) {
      return this.db.list('posts/' + key).remove()
    }
    else console.log('action prevented!')
  }
}


3. Role-Based Router Guards
Another method of securing data on the frontend is to block routes based on the user’s role. We can do this by subscribing to our user BehaviorSubject from the auth service, then mapping the corresponding authorization role to a boolean.


4. Role-Based Firebase Database rules
The last consideration, and possibly most important, is to secure the backend with Firebase database rules.

The rules below will allow the reader role to read data from the database, the author role to edit (but not delete), and the admin role to have full write access to the posts.

database.rules.json
{
  "posts": {
     ".read": "root.child('users').child(auth.uid).child('roles/reader').exists() === true",
     ".write": "(newData.exists() && root.child('users').child(auth.uid).child('roles/author').val() === true)
                ||
                (root.child('users').child(auth.uid).child('roles/admin').val() === true)"
  }
}


rxjs FAQ:
map()
switchMap()
Subject and Behavior Subject, .next()

*/
