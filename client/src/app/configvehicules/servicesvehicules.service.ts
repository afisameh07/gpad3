import { Injectable } from '@angular/core';

import { Services } from './servicesvehicules.module';
import { HttpClient } from "@angular/common/http";

import { Configsam } from '../configsam';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  private rootURL = "";
  listService: Services[];

  formData: Services;

  constructor(private http: HttpClient, private _configsam: Configsam) {
    this.rootURL = _configsam.rootURL;
   }
  postService(formData: Services) {
    return this.http.post(this.rootURL + '/servicesvehicules', formData);
  }
  deleteService(id) {
    return this.http.delete(this.rootURL + '/servicesvehicules/'+id);
  }
}
