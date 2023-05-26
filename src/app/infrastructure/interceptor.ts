import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment.example';
import { Session } from './utils/loggout';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const ignored_routes = ['/api/auth/login'];
    const endpoint = req.url.split(environment.apiUrl)[1];

    let headers = {};

    if(!ignored_routes.includes(endpoint)) {
        headers = {
            ...headers,
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    }

    const reqCloned = req.clone({
        headers: new HttpHeaders(headers)
    });

    return next.handle(reqCloned);
  }
}

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(private session: Session) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if(event.status === 401) {
                    this.session.loggoutUser();
                };
            }
            return event;
        }));
    }
}
