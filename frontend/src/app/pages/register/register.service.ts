import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post('http://localhost:3000/api/register', { email, password });
  }
}
