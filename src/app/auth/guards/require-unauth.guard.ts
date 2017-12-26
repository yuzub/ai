import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../auth.service";

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Injectable()
export class RequireUnauthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('require-unauth guard starts');
    return this.authService.authenticated$
      .take(1).do(authenticated => {
        if (authenticated) {
          this.router.navigate(['/instructors']);
        }
      }).map(authenticated => !authenticated) ;
  }
}
