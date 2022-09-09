import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { LoginComponent } from '../auth/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService {
  private baseUrl = 'http://102.68.170.27/nip-mini/public/index.php/api/v1';
  private token = localStorage.getItem('token');
  // token = LoginComponent.login();

  constructor(private httpClient: HttpClient) {}

  public header() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    // headers = ['Accept'] = 'application/json';
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return headers;
  }

  public headerForUpload() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    // headers = ['Accept'] = 'application/json';
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return headers;
  }

  public get(path: string, base?: number): Observable<any> {
    path = `${this.baseUrl}/${path}`;
    return this.httpClient.get(path, { headers: this.header() });
  }

  public post(path: string, data: any, base?: number): Observable<any> {
    path = `${this.baseUrl}/${path}`;
    return this.httpClient.post(path, data || {}, {
      headers: this.header(),
    });
  }

  public postfile(path: string, data: any, base?: number): Observable<any> {
    path = `${this.baseUrl}/${path}`;
    // return this.httpClient.post(path, data || {}, {
    //   headers: this.header(),
    //   reportProgress: true,
    //   observe: 'events',
    // });
    return this.httpClient.post(path, data || {}, {
      headers: this.headerForUpload(),
    });
  }

  public put(path: string, data: any): Observable<any> {
    path = `${this.baseUrl}/${path}`;
    return this.httpClient.put(path, data || {}, { headers: this.header() });
  }

  public patch(path: string, data: any): Observable<any> {
    path = `${this.baseUrl}/${path}`;
    return this.httpClient.patch(path, data || {}, { headers: this.header() });
  }

  public delete(path: string): Observable<any> {
    path = `${this.baseUrl}/${path}`;
    return this.httpClient.delete(path, { headers: this.header() });
  }

  public postForm(path: string, formData: FormData): Observable<any> {
    let Headers = this.header();
    Headers = Headers.delete('Content-Type');
    path = `${this.baseUrl}/${path}`;
    return this.httpClient.post(path, formData || {}, { headers: Headers });
  }
}
