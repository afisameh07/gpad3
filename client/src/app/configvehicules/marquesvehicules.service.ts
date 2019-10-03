import { Injectable } from '@angular/core';

import { Marque } from './marquesvehicules.module';
import { HttpClient } from "@angular/common/http";

import { Configsam } from '../configsam';


@Injectable({
  providedIn: 'root'
})

export class MarquesService {
  private rootURL = "";
  listmarque: Marque[];

  formData: Marque;

  constructor(private http: HttpClient, private _configsam:Configsam) { 
    this.rootURL = _configsam.rootURL;
  }
  postMarque(formData: Marque) {
    return this.http.post(this.rootURL + '/marquesvehicules', formData);
  }
  deleteMarque(id) {
    return this.http.delete(this.rootURL + '/marquesvehicules/'+id);
  }
}
