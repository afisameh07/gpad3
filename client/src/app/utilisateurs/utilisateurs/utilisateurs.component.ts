import { Component, OnInit } from '@angular/core';
//import { UtilisateurService } from 'src/app/utilisateurs/utilisateurs.service';
import { UtilisateurService } from './../utilisateurs.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateurComponent implements OnInit {

  constructor(public service: UtilisateurService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      _id: null,
      name: '',
      email: '',
      pwd: '',
      grade: '1',
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == null){
      console.log(form);
      this.insertRecord(form); }
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postEmployee(form.value).subscribe(res => {
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(res => {
      this.resetForm(form);
      this.service.refreshList();
    });

  }

}
