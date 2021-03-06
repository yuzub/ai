import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../auth.service";

@Injectable()
export class RequireAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('require-auth guard starts');
    return this.authService.authenticated$
      .take(1)
      .do(authenticated => {
        if (!authenticated) {
          this.authService.redirectUrl = state.url;
          this.router.navigate(['/login']);
        }
      });
  }
}
