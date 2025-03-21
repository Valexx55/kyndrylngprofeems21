import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../model/alumno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {


  alumnoEnEdicion!:Alumno

  cabecerasJson: HttpHeaders = new HttpHeaders({'Content-type':'application/json'});
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




borrarAlumnoPorId (id:number):Observable<void>
{
  return this.httpClient.delete<void>("http://localhost:9090/api/alumnos/"+id);
}


crearAlumno(alumno:Alumno):Observable<Alumno>
{
    return this.httpClient.post<Alumno>("http://localhost:9090/api/alumnos", alumno, {headers:this.cabecerasJson})
}

editarAlumno(alumno:Alumno, id:number):Observable<Alumno>
{
    return this.httpClient.put<Alumno>("http://localhost:9090/api/alumnos/"+id, alumno, {headers:this.cabecerasJson})
}


crearAlumnoConFoto(alumno:Alumno, archivo:File):Observable<Alumno>
{
  let formData = new FormData();

    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('edad', alumno.edad+'');
    formData.append('email', alumno.email);
    formData.append('archivo', archivo);


  return this.httpClient.post<Alumno>("http://localhost:9090/api/alumnos/insertar-alumno-foto", formData)
}


editarAlumnoConFoto(alumno:Alumno, archivo:File, id:number):Observable<Alumno>
{
  let formData = new FormData();

    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('edad', alumno.edad+'');
    formData.append('email', alumno.email);
    formData.append('archivo', archivo);


  return this.httpClient.put<Alumno>("http://localhost:9090/api/alumnos/editar-con-foto/"+id, formData)
}



}
