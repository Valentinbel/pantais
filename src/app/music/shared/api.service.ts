import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  clientId = '264588954';

  constructor( private http: HttpClient ) { }

  get(url:any, attachClientId?:any) {
    // Should attach client id if the attachToken
    // is true
    let u;
    attachClientId ? u = this.prepareUrl(url) : u = url;
    // Returns an obsrevable
    // for the HTTP get request
    return this.http.get(u);
  }

  prepareUrl(url:any) {
    //Attach client id to stream url
    //return `${url}?client_id=${this.clientId}`
    return `${url}?client_id=${this.clientId}`
  }

}
