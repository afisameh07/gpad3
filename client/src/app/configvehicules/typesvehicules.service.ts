import { Injectable } from '@angular/core';

import { Typee } from './typesvehicules.module';
import { HttpClient } from "@angular/common/http";

import { Configsam } from '../configsam';

@Injectable({
  providedIn: 'root'
})

export class TypeeService {
  private rootURL = "";
  listtype: Typee[];

  formData: Typee;

  constructor(private http: HttpClient, private _configsam: Configsam) {
    this.rootURL = _configsam.rootURL;
   }
  posttypee(formData: Typee) {
    return this.http.post(this.rootURL + '/typesvehicules', formData);
  }
  deleteTypee(id) {
    return this.http.delete(this.rootURL + '/typesvehicules/'+id);
  }
}
