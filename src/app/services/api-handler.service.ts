import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
// import { LoginComponent } from '../auth/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService {
  private baseUrl = env.API_URL + env.API_VERSION;
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
    headers = headers.set('Access-Control-Allow-Origin', '*');
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

  public postFile(path: string, data: any, base?: number): Observable<any> {
    path = `${this.baseUrl}/${path}`;
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
