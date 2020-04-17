# BlogCreator4Engineer
![Blog-Build-Script CI](https://github.com/kasdihacene/BlogCreator4Engineer/workflows/Blog-Build-Script%20CI/badge.svg)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `production/` directory. Use the `--prod` flag for a production build.

                ng build --prod --output-path production

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Adding Auth Guard Angular 9 or our application
### Auth Guard
>The auth guard is an angular route guard that's used to prevent unauthorized users from accessing restricted routes, it does this by implementing the CanActivate interface which allows the guard to decide if a route can be activated with the canActivate() method. If the method returns true the route is activated (allowed to proceed), otherwise if the method returns false the route is blocked.

- Steps : 

To ckeck if a JWT is expired we have to use an angular component angular-jwt :

        npm install --save @auth0/angular-jwt

To implement the route Guard, we have to create Guard service and override canActivate method :

        ng g guard security/auth

### Using HashLocationStrategy on production
    On production when reload the page we will have the 404 error
    because : With client-side SPAs we have two strategies we can 
    use to implement client-side routing, one is called the HashLocationStrategy 
    and the other is called the PathLocationStrategy which is activated by default.
    On PRODUCTION we will see the '#' character on URLs