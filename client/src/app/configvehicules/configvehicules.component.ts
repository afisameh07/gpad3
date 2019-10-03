import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Typee } from './typesvehicules.module';
import { TypeeService } from './typesvehicules.service';

import { Services } from './servicesvehicules.module';
import { ServicesService } from './servicesvehicules.service';

import { Marque } from './marquesvehicules.module';
import { MarquesService } from './marquesvehicules.service';


import { Modelevehicules } from './modelesvehicules.module';
import { Modeleservice } from './modelesvehicules.service';

import { Configsam } from '../configsam';

@Component({
  selector: 'app-configvehicules',
  templateUrl: './configvehicules.component.html',
  styleUrls: ['./configvehicules.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class ConfigvehiculesComponent implements OnInit {
  listtype: Typee[];
  listservice: Services[];
  listmarque: Marque[];
  listmodle: Modelevehicules[];


  private rootURL = "";

  constructor(
    private http: HttpClient,
    private typeeservice: TypeeService,
    private serviceservice: ServicesService,
    private marqueservice: MarquesService,
    private modeleservice: Modeleservice,
    private _configsam:Configsam
  ) {
    this.rootURL = _configsam.rootURL;
  }
  modeltypee = new Typee('');
  modelservice = new Services('');
  modelmarque = new Marque('');
  model = new Modelevehicules('');


  submitted = false;

  ngOnInit() {
    this.gettypevehicules();
    this.getservicevehicules();
    this.getmarquevehicules();
    this.getmodelesvehicules();
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
  onSubmittype(f: NgForm) {
    this.typeeservice.posttypee(f.value).toPromise().then(
      res => {
        this.gettypevehicules();
      }
    );
    this.modeltypee.nom = "";

  }
  deletetype(id) {
    this.typeeservice.deleteTypee(id).subscribe(res => {
      this.gettypevehicules();
      console.log('Deleted');
    });
  }
  // end type

  //service 
  getservicevehicules() {
    this.http.get(this.rootURL + '/servicesvehicules')
      .toPromise().then(
        res => {
          this.listservice = res as Services[];
        }
      );
  }
  onSubmitservice(f: NgForm) {
    this.serviceservice.postService(f.value).toPromise().then(
      res => {
        this.getservicevehicules();
      }
    );
    this.modelservice.nom = "";
  }
  deleteservice(id) {
    this.serviceservice.deleteService(id).subscribe(res => {
      this.getservicevehicules();
      console.log('Deleted');
    });
  }
  //end service

  //marque 
  getmarquevehicules() {
    this.http.get(this.rootURL + '/marquesvehicules')
      .toPromise().then(
        res => {
          this.listmarque = res as Marque[];
        }
      );
  }
  onSubmitmarque(f: NgForm) {
    this.marqueservice.postMarque(f.value).toPromise().then(
      res => {
        this.getmarquevehicules();
      }
    );
    this.modelmarque.nom = "";

  }
  deletemarque(id) {
    this.marqueservice.deleteMarque(id).subscribe(res => {
      this.getmarquevehicules();
      console.log('Deleted');
    });
  }
  //end marque

  // model

  getmodelesvehicules() {
    this.http.get(this.rootURL + '/modelesvehicules')
      .toPromise().then(
        res => {
          this.listmodle = res as Modelevehicules[];
        }
      );
  }
  onSubmitmodel(f: NgForm) {
    this.modeleservice.postModele(f.value).toPromise().then(
      res => {
        this.getmodelesvehicules();
      }
    );
    this.model.nom = "";
  }
  deletemodele(id) {
    this.modeleservice.deleteModele(id).subscribe(res => {
      this.getmodelesvehicules();
      console.log('Deleted');
    });
  }

  // end model
}