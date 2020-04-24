# BlogCreator4Engineer
![Blog-Build-Script CI](https://github.com/kasdihacene/BlogCreator4Engineer/workflows/Blog-workflow/badge.svg) [![Build Status](https://travis-ci.com/kasdihacene/BlogCreator4Engineer.svg?branch=master)](https://travis-ci.com/kasdihacene/BlogCreator4Engineer) [![codecov](https://codecov.io/gh/kasdihacene/BlogCreator4Engineer/branch/master/graph/badge.svg)](https://codecov.io/gh/kasdihacene/BlogCreator4Engineer)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

### About Blog4Engineer
An open-source blog to simply share your knowledges, personal achievements, experiences and archived POCs.
> To begin

        This guide explains the prerequisites for setting up the Blog4Engineer application, a personal blog, on your own platform. This requires some technical knowledge, however the first version [branch-1](https://github.com/kasdihacene/BlogCreator4Engineer/tree/version-1) of the application doesn't require to be an expert to deploy it in production and to obtain your own domain name.

> For the first time you have to install all angular packages 

        > npm install
        > ng serve [OPTION]

        ## [OPTION] : by default the development mode will be fired else --prod to get the configuration set for production

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Create an Angular service
        
                ng g s 'service'

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `production/` directory. Use the `--prod` flag for a production build.

                ng build --prod --output-path production

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Adding Auth Guard Angular 9 on our application
### Auth Guard
>The auth guard is an angular route guard that's used to prevent unauthorized users from accessing restricted routes, it does this by implementing the CanActivate interface which allows the guard to decide if a route can be activated with the canActivate() method. If the method returns true the route is activated (allowed to proceed), otherwise if the method returns false the route is blocked.

- Steps : 

To ckeck if a JWT is expired we have to use an angular component angular-jwt :

        npm install --save @auth0/angular-jwt

To implement the route Guard, we have to create Guard service and override canActivate method :

        ng g guard security/auth

On rooting module we have to activat authGuard on some routes like bellow :

        import { AuthGuardService as AuthGuard } from './security/auth.guard';
        :
        :
        const routes: Routes = [
        :
        { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }

>According to related process we will allow or reject access to requested route.


### Http interceptors service
Most interceptors transform the outgoing request before passing it to the next interceptor in the chain, by calling next.handle(transformedReq). An interceptor may transform the response event stream as well, by applying additional RxJS operators on the stream returned by next.handle().

> In our case we use the interceptors to potentially add headers (Authorizations, content-type...)

        We have to import the HttpClientModule only in your AppModule as imports

and as provider : 

        {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpInterceptorService,
                multi: true
        }
### Using HashLocationStrategy on production
    On production when reload the page we will have the 404 error
    because : With client-side SPAs we have two strategies we can 
    use to implement client-side routing, one is called the HashLocationStrategy 
    and the other is called the PathLocationStrategy which is activated by default.
    On PRODUCTION we will see the '#' character on URLs

### REDIRECTION to https
For redirecting http trafic to https in production environment, we have to add an .htaccess with to following code inside :

        <IfModule mod_rewrite.c>

	        RewriteEngine On
                # -- REDIRECTION to https:
                RewriteCond %{HTTPS} !on
                RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}
                # --
        </IfModule>

### Set code coverage 

        > npm install karma karma-coverage --save-dev
        > npm install codecov.io --save # To get code report 
        > npm install --save-dev karma karma-coverage codecov