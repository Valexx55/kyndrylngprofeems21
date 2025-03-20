import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../model/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { NgIf } from '@angular/common';
import { Observer } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-formulario-alumno',
  imports: [FormsModule, NgIf],
  templateUrl: './formulario-alumno.component.html',
  styleUrl: './formulario-alumno.component.css'
})
export class FormularioAlumnoComponent {

alumno:Alumno;
alumnoService:AlumnoService=inject(AlumnoService)
foto_seleccionada: File|null //Union Type 
observador:Observer<Alumno>

constructor()
{
  this.alumno = new Alumno()
  this.foto_seleccionada = null;

  this.observador =  {
    complete: () => console.log('Com terminada'),
    next: (alumnoNuevo) => {
      alert('Actualizado el registro de alumnos')
    } , 
    error: (error:any)=> {
      window.alert('Error al insertar')
      console.error(error);
    }
  }


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
