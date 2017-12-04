// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDTkUPX3aZjYJe8sGLFX1pTXdMbKC1TN1c",
    authDomain: "instructor-dp-ua.firebaseapp.com",
    databaseURL: "https://instructor-dp-ua.firebaseio.com",
    projectId: "instructor-dp-ua",
    storageBucket: "instructor-dp-ua.appspot.com",
    messagingSenderId: "1066323488008"
  }
};
