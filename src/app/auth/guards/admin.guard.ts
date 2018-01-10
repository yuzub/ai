// use this same logic to create a separate guard for each role or use-case.
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
// import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    console.log('admin guard starts');
    return this.auth.user
      .take(1)
      .map(user => {
        if (user && user.hasOwnProperty('roles') && user.roles.hasOwnProperty('admin')) {
          console.log(`admin guard: user.roles.admin = ${ user.roles.admin}`);
          return user.roles.admin;
        }
        return false;
        // return _.has(_.get(user, 'roles'), 'admin');
      })
      .do(authorized => {
        if (!authorized) {
          alert('Only admin can edit instructor info and feedbacks -> route prevented!')
           this.router.navigate(['/instructors']);
        }
      })
  }
}
