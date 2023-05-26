import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const maxAge = 30000;
@Injectable({
  providedIn: 'root'
})
export class RequestCache  {
  // this is a map of cached responses as key url and value cahed data pairs
  cache = new Map();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);
    // if the cache doesn't exist or expired then return undefined
    if (!cached) { return undefined; }
    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    // remove expired cache entries
    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}