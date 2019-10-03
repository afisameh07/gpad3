import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Configsam } from './configsam';

@Injectable()
export class AuthService {

  private _registerUrl = "";
  private _loginUrl = "";

  constructor(private http: HttpClient,
    private _router: Router,
    private _configsam: Configsam,
  ) {
    this._registerUrl = _configsam._registerUrl;
    this._loginUrl = _configsam._loginUrl;
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/dashboard'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
}
