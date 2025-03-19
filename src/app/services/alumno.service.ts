import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../model/alumno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  //aquí hacemos las conexiones por HTTP al servidor
  constructor(private httpClient:HttpClient) { 
    //this.httpClient.
  }


  buscarAlumnosPorId(id:number):Observable<Alumno>
 {
    return this.httpClient.get<Alumno>("http://localhost:9090/api/alumnos/"+id);
    //return this.httpClient.get<Alumno>("http://localhost:33333/alumno/"+id);
 } 


 listadoAlumnos():Observable<Array<Alumno>>
 {
    return this.httpClient.get<Array<Alumno>>("http://localhost:9090/api/alumnos");
    //return this.httpClient.get<Array<Alumno>>("http://localhost:33333/alumno");
 } 


listadoAlumnosPorPaginas (page:number, size:number): Observable<any>
{
  let parametros = new HttpParams().set('page', page).set('size', size);
  return this.httpClient.get<any>("http://localhost:9090/api/alumnos/pagina", {params: parametros} );
}



}
