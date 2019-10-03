import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


import { fournisseurs } from './fournisseurs.module';
import { Configsam } from '../configsam';

@Injectable({
  providedIn: 'root'
})

export class fournisseursService {

  private rootURL = "";

  listfournisseurs: fournisseurs[];
  formData: fournisseurs;

  constructor(private http: HttpClient, private _configsam: Configsam) {
    this.rootURL = _configsam.rootURL;
  }

  posttypee(formData: fournisseurs) {
    return this.http.post(this.rootURL + '/fournisseurs', formData);
  }
  deletegr(id: number) {
    return this.http.delete(this.rootURL + '/fournisseurs/' + id);
  }

}
