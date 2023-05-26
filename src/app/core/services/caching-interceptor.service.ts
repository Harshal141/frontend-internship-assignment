import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCache } from './request-cache.service';

// injectable means that this class can be injected into other classes
@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  // constructor to pass in the cache service
  constructor(private cache: RequestCache) {}

  // intercept outgoing requests and manipulate them
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // get all the cached responses
    const cachedResponse = this.cache.get(req);
    // if the cache exists then use of to return the response else use sendRequest to send the request
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler,
    cache: RequestCache): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // if the response is an instance then cache the response using the put method
          cache.put(req, event);
        }
      })
    );
  }
}