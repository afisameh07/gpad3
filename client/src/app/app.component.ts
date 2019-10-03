import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Configsam } from './configsam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AppComponent implements OnInit {

  private rootURL = "";
  constructor(
    private http: HttpClient,private _configsam: Configsam,
  ) { 
    this.rootURL = _configsam.rootURL;
  }
  ngOnInit() {
  }
}