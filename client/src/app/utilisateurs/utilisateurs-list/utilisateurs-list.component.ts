import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './../utilisateurs.model';
import { UtilisateurService } from './../utilisateurs.service';


@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateurs-list.component.html',
  styleUrls: ['./utilisateurs-list.component.css']
})
export class UtilisateurListComponent implements OnInit {

  constructor(public service: UtilisateurService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(uti: Utilisateur) {
    this.service.formData = Object.assign({}, uti);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteEmployee(id).subscribe(res => {
        this.service.refreshList();
      });
    }
  }

}
