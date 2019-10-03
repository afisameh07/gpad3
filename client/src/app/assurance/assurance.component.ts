import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from "@angular/common/http";

import { Vehicule } from '../vehicules/vehicules.model';

import { AssuranceService } from './assurance.service';
import { assurance } from './assurance.model';



import { Configsam } from '../configsam';

@Component({
  selector: 'app-assurance',
  templateUrl: './assurance.component.html',
  styleUrls: ['./assurance.component.scss']
})
export class AssuranceComponent implements OnInit {
  
  listvehicules: Vehicule[];
  private rootURL = "";
  
  
  constructor(
    private http: HttpClient,
    public _authService: AuthService,
    public service: AssuranceService,
    private _configsam: Configsam
    
  ) {
    this.rootURL = _configsam.rootURL;

  }

  ngOnInit() {
    this.refreshList();
    console.log(this.service);
  }
  refreshList() {
    this.http.get(this.rootURL + '/vehicules')
      .toPromise().then(
        res => {
          this.listvehicules = res as Vehicule[];
          this.cleanArray(this.listvehicules);
        }
      );
  }
  cleanArray(array) {
    var i, j, len = array.length, out = [], obj = {};
    for (i = 0; i < len; i++) {
      obj[array[i]] = 0;
    }
    for (j in obj) {
      out.push(j);
    }
    return out;
  }
}
