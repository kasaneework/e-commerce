# ****FYI*****
This project not done 100% yet. but you can run it and play with it.

1.open e-commerce and e-commerce-server on vscode

2.open terminal both of them and run command => npm install

3.e-commerce run command => ng s -o

4.turn on mysql on local

5.e-commerce-server set config app->config

6.e-commerce-server set server.js =>> see //-- RUN BD Migration

6.1. // ####### 1. //--comment out and run at first time to init DB and Table after that comment it all again

6.2. // ####### 2. //-- comment all no 1. and comment out no 2.

7.e-commerce-server run command => npm run dev

8.Front-end:: localhost:4200 and localhost:4200/admin

9.Back-end:: localhost:5000

10.Create first admin:: localhost:5000/api/auth/signup

11.post man

{
"firstname": "",
"lastname": "",
"phone": "",
"username": "",
"email": "email",
"password": "",
"roles":["admin"]
}

# ECommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
