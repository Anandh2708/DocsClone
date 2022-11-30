import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { COMPILER_OPTIONS, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptorService implements HttpInterceptor{

  constructor() { }

  private cache: Map<string, HttpResponse<any>> = new Map();
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('cache', this.cache);
    if(req.method !== "GET") {
      console.log('cache not called');
      return next.handle(req)
  }
  
  const cachedResponse: HttpResponse<any>|null|undefined = this.cache.get(req.urlWithParams)
  console.log('cached res', cachedResponse)
  if(cachedResponse) {
      console.log('response returned from cache');
      return of(cachedResponse.clone())
  }else {
    return next.handle(req).pipe(
      tap(stateEvent => {
          console.log('response not returned from cache');
          if(stateEvent instanceof HttpResponse) {
              this.cache.set(req.urlWithParams, stateEvent.clone())
          }
      })
  )
          
  }
  }
}
