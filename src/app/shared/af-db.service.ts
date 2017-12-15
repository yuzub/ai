import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";

import { IInstructor } from "../instructors/instructor";
import { IFeedback } from "../feedbacks/feedback";

@Injectable()
export class AfDbService {
  instructorsRef: AngularFireList<IInstructor>;
  feedbacksRef: AngularFireList<any>;

  objectRef: AngularFireObject<any>;
  object: Observable<any>;

  constructor(private afDb: AngularFireDatabase) {
    this.instructorsRef = this.afDb.list<IInstructor>('instructors');

    this.feedbacksRef = this.afDb.list<any>('feedbacks');

    // this.objectRef = this.afDb.object<any>('object');
    // this.object = this.objectRef.snapshotChanges()
    //   .map(action => ({ key: action.key, ...action.payload.val() }));
  }

  /*   save(newName: string) {
      this.objectRef.set({ name: 'newName' })
        .then(_ => console.log('success'))
        .catch(error => console.log(error));
    }
    update(newSize: string) {
      this.objectRef.update({ size: 'newSize' })
        .then(_ => console.log('success'))
        .catch(error => console.log(error));
    }
    delete() {
      this.objectRef.remove()
        .then(_ => console.log('success'))
        .catch(error => console.log(error));
    }

    getInstructor(id: string): Observable<any> {
      return this.afDb.object('instructors/' + id).valueChanges();
    } */

  // ------------------ Instructors -----------------------------

  getInstructor(key: string): Observable<IInstructor> {
    return this.afDb.object<IInstructor>(`instructors/${key}`).snapshotChanges()
      .map(action => ({ key: action.key, ...action.payload.val() }))
      .catch(this.errorHandler);
  }

  getInstructors(): Observable<IInstructor[]> {
    return this.instructorsRef.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    })
      .catch(this.errorHandler);
  }

  createInstructor(i: IInstructor) {
    return this.instructorsRef.push(i)
      .then(_ => console.log(`create instructor ${i.instructorName} - success`));
  }

  updateInstructor(i: IInstructor) {
    // after updateInstructor() method in updated instructor is added new property - instructor.key
    // before update() delete i.key property in i object
    return this.instructorsRef.update(i.key, i)
      .then(_ => console.log(`update instructor ${i.instructorName} - success`))
      .catch(error => console.log(error));
  }

  deleteInstructor(i: IInstructor) {
    return this.instructorsRef.remove(i.key)
      .then(_ => console.log(`remove instructor ${i.instructorName} - success`))
      .catch(error => console.log(error));
  }

  // ------------------ Feedbacks -----------------------------
  getFeedback(key: string): Observable<IFeedback> {
    return this.afDb.object<IFeedback>(`feedbacks/${key}`).snapshotChanges()
      .map(action => ({ key: action.key, ...action.payload.val() }))
      .catch(this.errorHandler);
  }

  getFeedbacks(): Observable<IFeedback[]> {
    return this.feedbacksRef.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    })
      .catch(this.errorHandler);
  }

  createFeedback(f: IFeedback) {
    console.info(f);
    return this.feedbacksRef.push(f)
      .then(_ => console.log(`create feedback for ${f.instructorName} - success`));
  }

  updateFeedback(f: IFeedback) {
    // after updateFeedback() method in updated instructor is added new property - instructor.key
    // before update() delete i.key property in i object
    return this.feedbacksRef.update(f.key, f)
      .then(_ => console.log(`update feedback for ${f.instructorName} - success`))
      .catch(error => console.log(error));
  }

  deleteFeedback(f: IFeedback) {
    return this.instructorsRef.remove(f.key)
      .then(_ => console.log(`remove feedback for ${f.instructorName} - success`))
      .catch(error => console.log(error));
  }

  // handleError(error: any) - rename???
  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }
}
