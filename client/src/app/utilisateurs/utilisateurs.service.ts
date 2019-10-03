import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateurs.model';
import { HttpClient } from "@angular/common/http";

import { Configsam } from '../configsam';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  formData  : Utilisateur;
  list : Utilisateur[];
  
  private rootURL ="";

  constructor(private http : HttpClient,private _configsam: Configsam) {
    this.rootURL = _configsam.rootURL;
  }

  postEmployee(formData : Utilisateur){
   return this.http.post(this.rootURL+'/utilisateurs',formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/utilisateurs')
    .toPromise().then(res => this.list = res as Utilisateur[]);
  }

  putEmployee(formData : Utilisateur){
    return this.http.put(this.rootURL+'/utilisateurs/'+formData._id,formData);
     
   }

   deleteEmployee(id : number){
    return this.http.delete(this.rootURL+'/utilisateurs/'+id);
   }
}
