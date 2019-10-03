import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Vehicule } from './vehicules.model';
import { VehiculeService } from './vehicules.service';

import { HttpClient } from "@angular/common/http";

import { Marque } from '../configvehicules/marquesvehicules.module';
import { Typee } from '../configvehicules/typesvehicules.module';
import { Services } from '../configvehicules/servicesvehicules.module';
import { Modelevehicules } from '../configvehicules/modelesvehicules.module';

import { Configsam } from '../configsam';


@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.scss']
})
export class VehiculesComponent implements OnInit {

  private rootURL = "";


  constructor(private http: HttpClient, public service: VehiculeService,private _configsam: Configsam) {
    this.rootURL = _configsam.rootURL;
   }

  listmarque: Marque[];
  listtype: Typee[];
  listservice: Services[];
  listmodle: Modelevehicules[];

  ngOnInit() {
    this.resetForm();
    this.service.refreshList();
    this.getmarquevehicules();
    this.gettypevehicules();
    this.getservicevehicules();
    this.getmodelesvehicules();

  }

  populateForm(uti: Vehicule) {
    this.service.formData = Object.assign({}, uti);
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet vehicule?')) {
      this.service.deleteVehiculee(id).subscribe(res => {
        this.service.refreshList();
      });
    }
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      _id: null,
      matriculation: '',
      typee: '',
      marquee: '',
      modelee: '',
      servicee: '',
      datacirculation: '',
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == null) {
      this.insertRecord(form);
    }
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postVehiculee(form.value).subscribe(res => {
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putVehiculee(form.value).subscribe(res => {
      this.resetForm(form);
      this.service.refreshList();
    });

  }

  //service 
  getservicevehicules() {
    this.http.get(this.rootURL + '/servicesvehicules')
      .toPromise().then(
        res => {
          this.listservice = res as Services[];
        }
      );
  }

  //marque 
  getmarquevehicules() {
    this.http.get(this.rootURL + '/marquesvehicules')
      .toPromise().then(
        res => {
          this.listmarque = res as Marque[];
        }
      );
  }

  // model

  getmodelesvehicules() {
    this.http.get(this.rootURL + '/modelesvehicules')
      .toPromise().then(
        res => {
          this.listmodle = res as Modelevehicules[];
        }
      );
  }

  // type
  gettypevehicules() {
    this.http.get(this.rootURL + '/typesvehicules')
      .toPromise().then(
        res => {
          this.listtype = res as Typee[];
        }
      );
  }
}
