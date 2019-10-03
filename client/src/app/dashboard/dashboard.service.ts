import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Configsam } from '../configsam';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private rootURL ="";

  constructor(private http : HttpClient,private _configsam: Configsam) {
    this.rootURL = _configsam.rootURL;
  }

  public downloadReport(file): Observable<any> {
    let url = `${this.rootURL}${"/excel"}`;
    var body = { filename: file };
  
    return this.http.post(url, body, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }
}
