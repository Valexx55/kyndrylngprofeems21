import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../model/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { NgIf } from '@angular/common';
import { Observer } from 'rxjs';
import { error } from 'console';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-alumno',
  imports: [FormsModule, NgIf],
  templateUrl: './formulario-alumno.component.html',
  styleUrl: './formulario-alumno.component.css'
})
export class FormularioAlumnoComponent implements OnInit {

alumno:Alumno;
alumnoService:AlumnoService=inject(AlumnoService)
foto_seleccionada: File|null //Union Type 
observador:Observer<Alumno>
@Input() idAlumno!:string //copia el valor de la url a este atributo de la clase //debemos configuar en app config withComponentInputBinding()
ruta:ActivatedRoute = inject(ActivatedRoute)//para acceder al valor de la url 
enEdicion!:boolean
router:Router = inject(Router)


constructor()
{
  this.alumno = new Alumno()
  this.foto_seleccionada = null;

  this.observador =  {
    complete: () => console.log('Com terminada'),
    next: (alumnoNuevo) => {
      alert('Actualizado el registro de alumnos')
      this.router.navigateByUrl('/listadoAlumnos')
    } , 
    error: (error:any)=> {
      window.alert('Error al insertar')
      console.error(error);
    }
  }


}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    //let url = window.location.href;
    //console.log(`url ${url} idAlumno ${this.idAlumno} `);
    if (this.idAlumno)
    {
      console.log("estamos en edición");
      //obtener el alumno del servicio
      this.alumno = this.alumnoService.alumnoEnEdicion
      this.enEdicion = true
    } else {
      console.log("estamos en creación");
      this.enEdicion = false
    }
  }

  estiloBoton ():string
  {
    let estilo:string = ""

      if (this.enEdicion)
      {
        estilo = "btn btn-success"
      } else 
      {
        estilo = "btn btn-primary"
      }

    return estilo

  }



crearAlumno()
{
  console.log('A crear alumno');
  if (this.foto_seleccionada!=null)
  {
    this.alumnoService.crearAlumnoConFoto(this.alumno, this.foto_seleccionada).subscribe(this.observador)

  } else {
    this.alumnoService.crearAlumno(this.alumno).subscribe(this.observador)
  }
  

}

editarAlumno ()
{
  console.log('A editar alumno');
  if (this.foto_seleccionada!=null)
    {
      this.alumnoService.editarAlumnoConFoto(this.alumno, this.foto_seleccionada, this.alumno.id).subscribe(this.observador)
  
    } else {
      this.alumnoService.editarAlumno(this.alumno, this.alumno.id).subscribe(this.observador)
    }
}


seleccionarFoto (evento:Event)
{
  let input = evento.target as HTMLInputElement
  if (input && input.files)
  {
    this.foto_seleccionada = input.files[0];
    console.log(`Nombre archivo =  ${this.foto_seleccionada.name}`);
    console.log(`Tipo archivo =  ${this.foto_seleccionada.type}`);

    //comprobamos que el tipo mime del archivo sea imange
    if (this.foto_seleccionada.type.indexOf('image') >=0)
    {
      console.log('El usuario ha seleccionado imagen ');
    } else {
      console.log('El usuario ha NO seleccionado imagen ');
      this.foto_seleccionada = null;
    }


  }
  
}

}
