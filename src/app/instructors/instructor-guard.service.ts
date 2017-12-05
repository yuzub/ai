import {Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class InstructorGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let id = route.url[1].path;
    if(id == '0') {
      alert('Instructor Router Guard works if id="0"');
      this.router.navigate(['/instructors']);
      return false;
    }
    return true;
  }

}
