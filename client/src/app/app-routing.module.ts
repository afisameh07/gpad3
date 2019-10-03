import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { LoginComponent } from './login/login.component';
import { ConfigComponent } from './config/config.component';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { ConfigvehiculesComponent } from './configvehicules/configvehicules.component';
import { fournisseursComponent } from './fournisseurs/fournisseurs.component';
import { DepencesComponent } from './depences/depences.component';
import { AssuranceComponent } from './assurance/assurance.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'vehicules', component: VehiculesComponent },
  { path: 'configvehicules', component: ConfigvehiculesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'utilisateur', component: UtilisateursComponent },
  { path: 'depences', component: DepencesComponent },
  { path: 'fournisseurs', component: fournisseursComponent },
  { path: 'assurance', component: AssuranceComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
