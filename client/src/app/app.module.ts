import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { LoginComponent } from './login/login.component';


import { UtilisateurComponent } from './utilisateurs/utilisateurs/utilisateurs.component';
import { UtilisateurListComponent } from './utilisateurs/utilisateurs-list/utilisateurs-list.component';
import { UtilisateurService } from './utilisateurs/utilisateurs.service';
import { ConfigComponent } from './config/config.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { FooterComponent } from './footer/footer.component';
import { ConfigvehiculesComponent } from './configvehicules/configvehicules.component';

import { Configsam } from './configsam';
import { DepencesComponent } from './depences/depences.component';
import { fournisseursComponent } from './fournisseurs/fournisseurs.component';
import { fournisseursService } from './fournisseurs/fournisseurs.service';

import { AssuranceComponent } from './assurance/assurance.component';
import { AssuranceService } from './assurance/assurance.service';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UtilisateursComponent,
    LoginComponent,
    UtilisateursComponent,
    UtilisateurComponent,
    UtilisateurListComponent,
    ConfigComponent,
    SidebarComponent,
    NavbarComponent,
    VehiculesComponent,
    FooterComponent,
    ConfigvehiculesComponent,
    DepencesComponent,
    fournisseursComponent,
    AssuranceComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule, 
    MDBBootstrapModule.forRoot(), 
    HttpClientModule, 
    FormsModule
  ],

  providers: [AuthService, UtilisateurService, fournisseursService, Configsam, AssuranceService],
  bootstrap: [AppComponent]
})
export class AppModule { }