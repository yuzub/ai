import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { IInstructor } from "./instructor";
import { AfDbService } from "../shared/af-db.service";

@Injectable()
export class InstructorResolver implements Resolve<IInstructor> {
  constructor(private afDbService: AfDbService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInstructor> {
    let id: string = route.paramMap.get('id');
    let instructor = this.afDbService.getInstructor(id)
      .take(1);

    console.log(instructor);
    return instructor;
  }

}
