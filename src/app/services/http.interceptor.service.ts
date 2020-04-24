import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(
        req: import("@angular/common/http").HttpRequest<any>,
        next: import("@angular/common/http").HttpHandler):
        import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

        return from(this.handleAccess(req, next));
    }


    private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
        Promise<HttpEvent<any>> {

        let changedRequest = request;

        // HttpHeader object immutable - copy values
        const headerSettings: { [name: string]: string | string[]; } = {};

        for (const key of request.headers.keys()) {
            headerSettings[key] = request.headers.getAll(key);
        }

        const newHeader = new HttpHeaders(headerSettings);

        changedRequest = request.clone({ headers: newHeader });

        return next.handle(changedRequest).toPromise();
    }
} 