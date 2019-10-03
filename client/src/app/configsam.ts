import { Injectable } from '@angular/core';
@Injectable()
export class Configsam {
    /* 
    public _registerUrl = "http://localhost:5000/api/register";
    public _loginUrl = "http://localhost:5000/api/login";
    public rootURL = "http://localhost:5000";
    
    */
 
    public _registerUrl = "http://192.168.50.8:5000/api/register";
    public _loginUrl = "http://192.168.50.8:5000/api/login";
    public rootURL = "http://192.168.50.8:5000";


    constructor() { }
}