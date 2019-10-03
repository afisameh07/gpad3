import { Injectable } from '@angular/core';

import { Modelevehicules } from './modelesvehicules.module';
import { HttpClient } from "@angular/common/http";

import { Configsam } from '../configsam';

@Injectable({
  providedIn: 'root'
})

export class Modeleservice {
  private rootURL = "";
  listModele: Modelevehicules[];

  formData: Modelevehicules;
  
  constructor(private http: HttpClient, private _configsam:Configsam) { 
    this.rootURL = _configsam.rootURL;
  }
  postModele(formData: Modelevehicules) {
    return this.http.post(this.rootURL + '/modelesvehicules', formData);
  }
  deleteModele(id) {
    return this.http.delete(this.rootURL + '/modelesvehicules/'+id);
  }
}
