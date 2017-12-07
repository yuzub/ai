import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";

import { IInstructor } from "../instructors/instructor";

@Injectable()
export class AfDbService {
  instructorsRef: AngularFireList<IInstructor>;
  // instructorRef: Observable<IInstructor[]>;

  constructor(private afDb: AngularFireDatabase) {
    this.instructorsRef = this.afDb.list<IInstructor>('instructors');
  }

  // getInstructor(id: string): Observable<any> {
  //   return this.afDb.object('instructors/' + id).valueChanges();
  // }

  getInstructor(key: string): Observable<IInstructor>  {
    return this.afDb.object<IInstructor>('instructors/' + key).snapshotChanges()
      .map(action => ({ key: action.key, ...action.payload.val() }));

  }

  createInstructor(i: IInstructor) {
    this.instructorsRef.push(i);
  }

  updateInstructor(key: string, i: IInstructor) {
    this.instructorsRef.update(key, i);
  }

  deleteInstructor(key: string) {
    this.instructorsRef.remove(key);
  }

  getInstructors(): Observable<IInstructor[]> {
    return this.instructorsRef.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    // add handle errors?
  }

  getFeedbacks() {}
}
