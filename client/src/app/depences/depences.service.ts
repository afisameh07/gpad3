import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Depence } from './depences.model';
import { Configsam } from '../configsam';


@Injectable({
  providedIn: 'root'
})
export class DepenceService {
  formData  : Depence;
  listdepence : Depence[];
  
  ngOnInit() {
  }
  private rootURL ="";
  constructor(private http : HttpClient,private _configsam: Configsam) {
    this.rootURL = _configsam.rootURL;
  }

  postDepencee(formData : Depence){
   return this.http.post(this.rootURL+'/depences',formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/depences')
    .toPromise().then(
      res => {
        this.listdepence = res as Depence[];
      }
      );
  }

  putDepencee(formData : Depence){
    return this.http.put(this.rootURL+'/depences/'+formData._id,formData);
     
   }
   deleteDepencee(id : number){
    return this.http.delete(this.rootURL+'/depences/'+id);
   }

}



