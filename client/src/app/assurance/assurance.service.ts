import { Injectable } from '@angular/core';
import { assurance } from './assurance.model';
import { HttpClient } from "@angular/common/http";
import { NgForm } from '@angular/forms';

import { Configsam } from '../configsam';

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {
  formData  : assurance;
  list : assurance[];
  

  ngOnInit() {
  }

  private rootURL ="";

  constructor(private http : HttpClient,private _configsam: Configsam) {
    this.rootURL = _configsam.rootURL;
  }

  postAssurancee(formData : assurance){
   return this.http.post(this.rootURL+'/Assurances',formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/Assurances')
    .toPromise().then(
      res => {
        this.list = res as assurance[];
      }
      );
  }

  putAssurancee(formData : assurance){
    return this.http.put(this.rootURL+'/Assurances/'+formData._id,formData);
     
   }

   deleteAssurancee(id : number){
    return this.http.delete(this.rootURL+'/Assurances/'+id);
   }





}



