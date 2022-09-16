import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private readonly apiService: ApiHandlerService) {}

  login(data: any) {
    return this.apiService.post('auth/login', data);
  }

  register(data: any) {
    return this.apiService.post('auth/registration', data);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    } else {
     return true;
    }  
  }
}
