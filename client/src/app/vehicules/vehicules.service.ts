import { Injectable } from '@angular/core';
import { Vehicule } from './vehicules.model';
import { HttpClient } from "@angular/common/http";

import { Configsam } from '../configsam';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  formData  : Vehicule;
  list : Vehicule[];
  

  ngOnInit() {
  }

  private rootURL ="";

  constructor(private http : HttpClient,private _configsam: Configsam) {
    this.rootURL = _configsam.rootURL;
  }

  postVehiculee(formData : Vehicule){
   return this.http.post(this.rootURL+'/vehicules',formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/vehicules')
    .toPromise().then(
      res => {
        this.list = res as Vehicule[];
      }
      );
  }

  putVehiculee(formData : Vehicule){
    return this.http.put(this.rootURL+'/vehicules/'+formData._id,formData);
     
   }

   deleteVehiculee(id : number){
    return this.http.delete(this.rootURL+'/vehicules/'+id);
   }





}



