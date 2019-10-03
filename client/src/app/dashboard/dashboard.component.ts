import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { saveAs } from "file-saver";
import { Depence } from '../depences/depences.model';
import { Configsam } from '../configsam';
import { DashboardService } from './dashboard.service';
import { Vehicule } from '../vehicules/vehicules.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class DashboardComponent implements OnInit {

  ldtv: Depence[];
  ldtv_updated: Depence[];
  liste_vv: Vehicule[];

  filter_dad = true;
  filter_bc = false;
  filter_inter = false;

  newdatedebut: string = '';
  newdatefin: string = '';
  msg: string = "";
  list_type_vehicules = [];
  list_type_vehicules_montant = [];
  list_type_somme = 0;
  list_libelle = [];
  list_vehicules = [];
  datavalideshowbutton = true;
  vehicule_montants = [];
  private rootURL = '';
  constructor(
    public http: HttpClient,
    public _authService: AuthService,
    private _configsam: Configsam,
    private _api: DashboardService
  ) {
    this.rootURL = _configsam.rootURL;
  }
  ngOnInit() {
    this.getldtv();
  }
  filter_dadd() {
    this.filter_dad = true;
    this.filter_bc = false;
    this.filter_inter = false;
    console.log('this.filter_dad');
  }
  filter_bcc() {
    this.filter_dad = false;
    this.filter_bc = true;
    this.filter_inter = false;
    console.log('this.filter_bc');
  }
  filter_interr() {
    this.filter_dad = false;
    this.filter_bc = false;
    this.filter_inter = true;
    console.log('this.filter_inter');
  }
  get_list_type_vdata() {
    this.http.get(this.rootURL + '/vehicules')
      .toPromise().then(
        res => {
          this.liste_vv = res as Vehicule[];
          this.get_list_type_v();
        }
      );
  }
  getldtv() {
    this.http.get(this.rootURL + '/depences')
      .toPromise().then(
        res => {
          this.ldtv = res as Depence[];
          this.ldtv_updated = this.ldtv;
          this.get_list_type_vdata();
        }
      );
  }
  download() {
    let filename = 'gpad.xlsx';
    this._api.downloadReport(filename).subscribe(
      data => {
        saveAs(data, filename);
      },
      err => {
        alert('Problem while downloading the file.');
        console.error(err);
      }
    );
  }
  gettypevehicule(veh) {
    const vehiculesearch = this.liste_vv.filter(d => d.matriculation === veh.immat);
    return vehiculesearch[0].typee;

  }
  get_list_type_v() {
    this.list_type_vehicules = [];
    this.list_vehicules = [];
    this.vehicule_montants = [];
    this.list_libelle = [];
    let t = '';
    let ve = '';
    let grp = '';
    for (let i = 0; i < (this.ldtv_updated.length); i++) {
      grp = this.ldtv_updated[i].libelle;
      if (!this.list_type_vehicules.includes(this.gettypevehicule(this.ldtv_updated[i]))) {
        this.list_type_vehicules.push(this.gettypevehicule(this.ldtv_updated[i]));
      }
      if (!this.list_vehicules.includes(this.ldtv_updated[i].immat)) {
        this.list_vehicules.push(this.ldtv_updated[i].immat);
      }
      if (!this.list_libelle.includes(grp)) {
        this.list_libelle.push(grp);
      }
    }
    this.list_type_somme = 0;
    for (let j = 0; j < (this.list_type_vehicules.length); j++) {
      this.list_type_vehicules_montant[j] = 0;
      for (let i = 0; i < (this.ldtv_updated.length); i++) {
        if (this.gettypevehicule(this.ldtv_updated[i]) == this.list_type_vehicules[j]) {
          this.list_type_vehicules_montant[j] += parseFloat(this.ldtv_updated[i].montant);
        }
      }
      this.list_type_somme += this.list_type_vehicules_montant[j];
    }

    for (let j = 0; j < (this.list_vehicules.length); j++) {
      this.vehicule_montants[j] = 0;

      for (let i = 0; i < (this.ldtv_updated.length); i++) {
        if (this.ldtv_updated[i].immat == this.list_vehicules[j]) {
          this.vehicule_montants[j] += parseFloat(this.ldtv_updated[i].montant);
        }
      }
    }
  }
  gettotal(i) {
    return this.list_type_vehicules_montant[i];
  }
  getpourcentage(j) {
    return ((this.list_type_vehicules_montant[j] / this.list_type_somme) * 100).toFixed(1);
  }
  getpourcentagevehicule(k) {
    return ((this.vehicule_montants[k] / this.list_type_somme) * 100).toFixed(1);
  }

  get_groupe_somme(type_v, lib) {
    let ss = 0;
    for (let i = 0; i < (this.ldtv_updated.length); i++) {
      if ((this.gettypevehicule(this.ldtv_updated[i]) == type_v) && (this.ldtv_updated[i].libelle == lib)) {
        ss += parseFloat(this.ldtv_updated[i].montant);
      }
    }
    return ss;
  }
  get_somme_vehicule(vee, list_dep) {
    let ss = 0;
    for (let i = 0; i < (this.ldtv_updated.length); i++) {
      if ((this.ldtv_updated[i].immat == vee) && (this.ldtv_updated[i].libelle == list_dep)) {
        ss += parseFloat(this.ldtv_updated[i].montant);
      }
    }
    return ss;
  }
  get_somme_pour_vehicule(vee, list_dep) {
    let ss = 0;
    for (let i = 0; i < (this.ldtv_updated.length); i++) {
      if ((this.ldtv_updated[i].immat == vee) && (this.ldtv_updated[i].libelle == list_dep)) {
        ss += parseFloat(this.ldtv_updated[i].montant);
      }
    }

    return ((ss / this.list_type_somme) * 100).toFixed(1);
  }
  get_groupe_somme_pour(type_v, lib) {

    let ss = 0;
    for (let i = 0; i < (this.ldtv_updated.length); i++) {
      if ((this.gettypevehicule(this.ldtv_updated[i]) == type_v) && (this.ldtv_updated[i].libelle == lib)) {
        ss += parseFloat(this.ldtv_updated[i].montant);
      }
    }
    return ((ss / this.list_type_somme) * 100).toFixed(1);
  }
  rapport_pourcentage(sommepourcentage, getpourcentage) {
    return ((sommepourcentage / getpourcentage) * 100).toFixed(1);
  }
  rapport_pourcentage_v(sommepourcentage, getpourcentagevehicule) {
    return ((sommepourcentage / getpourcentagevehicule) * 100).toFixed(1);
  }
  d_debut_change(newdatedebut) {
    this.newdatedebut = newdatedebut;
    this.testvalidatedate();
  }
  d_fin_change(newdatefin) {
    this.newdatefin = newdatefin;
    this.testvalidatedate();
  }
  testvalidatedate() {
    if (this.newdatedebut && this.newdatefin) {
      let dd = new Date(this.newdatedebut);
      let df = new Date(this.newdatefin);
      if (dd > df) {
        this.msg = 'Date de fin toujours supérieur à date de début';
        this.datavalideshowbutton = false;
      } else {
        this.msg = '';
        this.datavalideshowbutton = true;
      }
    }
  }
  onexcel() {
    if (this.newdatedebut && this.newdatefin) {
      let dd = new Date(this.newdatedebut);
      let df = new Date(this.newdatefin);
      console.log('deux dates');
      if (dd > df) {
        this.msg = 'Date de fin toujours supérieur à date de début';
        this.datavalideshowbutton = false;
      } else {
        this.msg = '';
        this.datavalideshowbutton = true;
      }
      console.log(this.newdatedebut);
      console.log(this.newdatefin);
    } else if (this.newdatedebut) {
      console.log(this.newdatedebut);

    } else if (this.newdatefin) {
      console.log(this.newdatefin);

    } else {
      this.download();
      console.log('no dates');

    }
  }
  modelChanged() {
  }
  recherche_avec_deux_dates() {
    this.ldtv_updated = [];
    var dateFrom = this.newdatedebut;
    var dateTo = this.newdatefin;
    var d1 = dateFrom.split('-');
    var d2 = dateTo.split('-');
    var from = new Date(parseInt(d1[0]), parseInt(d1[1]) - 1, parseInt(d1[2]));  // -1 because months are from 0 to 11
    var to = new Date(parseInt(d2[0]), parseInt(d2[1]) - 1, parseInt(d2[2]));
    for (let i = 0; i < (this.ldtv.length); i++) {

      if (this.filter_bc) {
        var dateCheck = this.ldtv[i].bc_date;
      } else if (this.filter_inter) {
        var dateCheck = this.ldtv[i].intervention_date;
      } else {
        var dateCheck = this.ldtv[i].dad_date;
      }
      var c = dateCheck.split("-");
      var check = new Date(parseInt(c[0]), parseInt(c[1]) - 1, parseInt(c[2]));

      if (check >= from && check <= to) {
        this.ldtv_updated.push(this.ldtv[i]);
      }
    }
    this.get_list_type_v();
  }
  recherche_avec_date_debut() {
    this.ldtv_updated = [];
    var dateFrom = this.newdatedebut;
    var d1 = dateFrom.split("-");
    var from = new Date(parseInt(d1[0]), parseInt(d1[1]) - 1, parseInt(d1[2]));  // -1 because months are from 0 to 11
    for (let i = 0; i < (this.ldtv.length); i++) {
      if (this.filter_bc) {
        var dateCheck = this.ldtv[i].bc_date;
      } else if (this.filter_inter) {
        var dateCheck = this.ldtv[i].intervention_date;
      } else {
        var dateCheck = this.ldtv[i].dad_date;
      }
      var c = dateCheck.split("-");
      var check = new Date(parseInt(c[0]), parseInt(c[1]) - 1, parseInt(c[2]));
      if (check >= from) {
        this.ldtv_updated.push(this.ldtv[i]);
      }
    }
    this.get_list_type_v();
  }
  recherche_avec_date_fin() {
    this.ldtv_updated = [];
    var dateTo = this.newdatefin;
    var d2 = dateTo.split("-");
    var to = new Date(parseInt(d2[0]), parseInt(d2[1]) - 1, parseInt(d2[2]));
    for (let i = 0; i < (this.ldtv.length); i++) {
      if (this.filter_bc) {
        var dateCheck = this.ldtv[i].bc_date;
      } else if (this.filter_inter) {
        var dateCheck = this.ldtv[i].intervention_date;
      } else {
        var dateCheck = this.ldtv[i].dad_date;
      }
      var c = dateCheck.split("-");
      var check = new Date(parseInt(c[0]), parseInt(c[1]) - 1, parseInt(c[2]));
      if (check <= to) {
        this.ldtv_updated.push(this.ldtv[i]);
      }
    }
    this.get_list_type_v();
  }
  recherche_sens_dates() {
    this.getldtv();
  }

  onsearch() {
    if (this.newdatedebut && this.newdatefin) {
      let dd = new Date(this.newdatedebut);
      let df = new Date(this.newdatefin);
      if (dd > df) {
        this.msg = 'Date de fin toujours supérieur à date de début';
        this.datavalideshowbutton = false;
      } else {
        this.msg = '';
        this.datavalideshowbutton = true;
        // recherche avec deux dates
        this.recherche_avec_deux_dates();
      }
    } else if (this.newdatedebut) {
      // recherche avec date de debut
      this.recherche_avec_date_debut();

    } else if (this.newdatefin) {
      // recherche avec date de fin
      this.recherche_avec_date_fin();

    } else {
      this.recherche_sens_dates();
      // recherche sens deux dates
    }
  }
}
