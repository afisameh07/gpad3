import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ConfigComponent implements OnInit {

  constructor(
    public http: HttpClient,
    public _authService: AuthService,
  ) { }
  ngOnInit() {
  }
}