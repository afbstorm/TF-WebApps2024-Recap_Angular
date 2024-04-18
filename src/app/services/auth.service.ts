import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authStatus!: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.authStatus = new BehaviorSubject<boolean>(true);
    } else {
      this.authStatus = new BehaviorSubject<boolean>(false);
    }
  }

  login(data: any) {
    const { email, password } = data;
    return this.http.post<any>('http://localhost:8001/api/users/login', { email, password })
      .pipe(map(user => {
        localStorage.setItem('token', JSON.stringify(user));
        this.authStatus.next(true);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }

  register(data: any) {
    const { username, email, password } = data;
    return this.http.post('http://localhost:8001/api/users/', { username, email, password });
  }
}
