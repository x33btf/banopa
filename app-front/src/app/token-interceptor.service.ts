import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import { ConnectionService} from "./services/connection.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let connectionService = this.injector.get(ConnectionService);

    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${connectionService.getToken()}`
      }
    })
    return next.handle(tokenizeReq)
  }
}
