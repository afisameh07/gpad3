import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from "@angular/common/http";
import { NgForm } from '@angular/forms';


import { fournisseurs } from './fournisseurs.module';
import { fournisseursService } from './fournisseurs.service';

import { Configsam } from '../configsam'

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class fournisseursComponent implements OnInit {


  listgroupe: fournisseurs[];
  modelfournisseurs = new fournisseurs('', '', '');

  private rootURL = "";

  constructor(
    private http: HttpClient,
    public _authService: AuthService,
    private fournisseursService: fournisseursService,
    private _configsam: Configsam

  ) {
    this.rootURL = _configsam.rootURL;
  }

  ngOnInit() {
    this.getfournisseurs();
  }

  getfournisseurs() {
    this.http.get(this.rootURL + '/fournisseurs')
      .toPromise().then(
        res => {
          this.listgroupe = res as fournisseurs[];
        }
      );
  }
  onSubmitfournisseurs(f: NgForm) {
    this.fournisseursService.posttypee(f.value).toPromise().then(
      res => {
        this.getfournisseurs();
      }
    );
    this.modelfournisseurs.nom = "";
    this.modelfournisseurs.tel = "";
    this.modelfournisseurs.description = "";

  }
  deletegr(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      this.fournisseursService.deletegr(id).subscribe(res => {
        this.getfournisseurs();
      });
    }
    ;

  }

}
