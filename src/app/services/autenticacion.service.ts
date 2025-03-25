import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Credenciales } from '../model/credenciales';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  httpCliente:HttpClient= inject(HttpClient)

  cabecerasJson: HttpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor() { 
  }

  public login (loginUsuario:Credenciales):Observable<HttpResponse<any>>
    {
      return this.httpCliente.post<any>('http://localhost:9090/api/alumnos/login', loginUsuario, {headers: this.cabecerasJson, observe:'response'}) //observe:'response' con esto puedo acceder a los datos de la cabecera
    }
}
