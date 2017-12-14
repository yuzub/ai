/instructors
  key
    instructorName
    ...
    rating: number[]
    user.uid or userKey (who create instructor)
    isVerifying: boolean (default -> false)

/feedbacks
  key
    user.uid or userKey (who create feedback)
    userName
    instructorKey
    instructorName
    text
    rating

Instructor's rating can change in moment when user adds new feedback.
In saveFeedback() after saving feedback  - push new value of instructor in rating array of this instructor?


//-----------------------------------------------------------------------------------------------
instructors          - instructor-list   list('/instructors') query in instructors on isVerifying=true
                                                                        -> ins-detail for all user
                                                                        -> ins-edit for admin
  <rating> component - list('/feedbacks') query in feedbacks on instructorKey and evaluate rating

instructors/:id      - instructor-detail object('/instructors/instructorKey')   -> ins-edit and delete() for user.uid or user isAdmin
  <instructor-feedback> component -      list('/feedbacks') query in feedbacks on instructorKey

instructors/:id/edit - instructor-edit   object('/instructors/instructorKey') form [ngModel]

add instructor
instructors/new/edit - instructor-edit   new Instructor() form [ngModel]

//-----------------------------------------------------------------------------------------------
feedbacks            - feedback-list     list('/feedbacks') see more...   -> feedbacks-detail for all user
                                                                          -> feedbacks-edit for admin

feedbacks/:id      - feedback-detail object('/feedbacks/feedbackKey')     -> ins-edit and delete() for user.uid or user isAdmin

feedbacks/:id/edit - feedback-edit   object('/feedbacks/feedbackKey') form [ngModel]


add feedback
feedbacks/new/edit   - feedback-edit     new Feedback() form [ngModel]
  <user-feedbacks> component -           list('/feedbacks') query in feedbacks on user.uid

if user opens links in different pages, when user logout - ...?


# Ai

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
