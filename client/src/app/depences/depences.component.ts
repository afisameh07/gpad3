import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from "@angular/common/http";
import { NgForm } from '@angular/forms';

import { Vehicule } from '../vehicules/vehicules.model';
import { fournisseurs } from '../fournisseurs/fournisseurs.module';

import { Typee } from '../configvehicules/typesvehicules.module';

import { Depence } from './depences.model';
import { DepenceService } from './depences.service';

import { Configsam } from '../configsam';


@Component({
  selector: 'app-depences',
  templateUrl: './depences.component.html',
  styleUrls: ['./depences.component.scss']
})
export class DepencesComponent implements OnInit {

  listvehicules: Vehicule[];
  listfournisseurs: fournisseurs[];
  listdepences: Depence[];
  listtype: Typee[];

  modeldepence = new Depence(null, "", "", "", "", "", "", "", "", "", "", "");

  private rootURL = "";

  constructor(
    private http: HttpClient,
    public _authService: AuthService,
    private depenceservice: DepenceService,
    private _configsam: Configsam
  ) {
    this.rootURL = _configsam.rootURL;

  }
  ngOnInit() {
    this.refreshList();
    this.getfournisseurs();
    this.getdepences();
    this.gettypevehicules();

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
  resetForm(form?: NgForm) {
    this.modeldepence = new Depence(null, "", "", "", "", "", "", "", "", "", "", "");
  }
  populateForm(uti: Depence) {
    this.depenceservice.formData = Object.assign({}, uti);
  }
  refreshList() {
    this.http.get(this.rootURL + '/vehicules')
      .toPromise().then(
        res => {
          this.listvehicules = res as Vehicule[];
          this.cleanArray(this.listvehicules);
        }
      );
  }
  cleanArray(array) {
    var i, j, len = array.length, out = [], obj = {};
    for (i = 0; i < len; i++) {
      obj[array[i]] = 0;
    }
    for (j in obj) {
      out.push(j);
    }
    return out;
  }
  getfournisseurs() {
    this.http.get(this.rootURL + '/fournisseurs')
      .toPromise().then(
        res => {
          this.listfournisseurs = res as fournisseurs[];
        }
      );
  }
  getdepences() {
    this.http.get(this.rootURL + '/depences')
      .toPromise().then(
        res => {
          this.listdepences = res as Depence[];
        }
      );
  }

  onSubmit(dataa: NgForm) {

    this.depenceservice.postDepencee(dataa.value).subscribe(res => {
      this.getdepences();
      this.resetForm();
    });

  }
  updateRecord(form: NgForm) {
    this.depenceservice.putDepencee(form.value).subscribe(res => {
      this.getdepences();
      this.resetForm();

    });

  }
  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer depence ?')) {
      this.depenceservice.deleteDepencee(id).subscribe(res => {
        this.getdepences();
      });
    }
  }

  /*
  public _id: number,
        public dad: string,
        public dad_date: string,
        public bc: string,
        public bc_date: string,
        public immat: string,
        public libelle: string,
        public description: string,
        public montant: string,
        public facture: string,
        public fournisseur: string,
        public intervention_date: string,
  */

}
