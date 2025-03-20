import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observer, delay } from 'rxjs';
import { Alumno } from '../../model/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { DatePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
//import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-lista-alumnos-buena',
  imports: [NgFor, NgIf, UpperCasePipe, DatePipe, MatPaginatorModule,MatProgressBarModule ],
  templateUrl: './lista-alumnos-buena.component.html',
  styleUrl: './lista-alumnos-buena.component.css'
})
export class ListaAlumnosBuenaComponent implements OnInit, OnDestroy {

//TODO: trabajar con imágenes por defecto

  observerListaAlumnos: Observer<Array<Alumno>>

  listaAlumnos!: Array<Alumno>

  alumnoService: AlumnoService = inject(AlumnoService)

  totalRegistros:number=0
  totalPorPagina:number=4
  paginaActual:number=0
  pageSizeOptions:number[]=[4, 8, 12, 24]

  listaPendiente:boolean;


  constructor ()
 {

  //this.totalRegistros
  this.listaPendiente = true;

  this.observerListaAlumnos = {
    complete: () => { console.log("Comunicación completada"); },
    error: (error_rx) => { console.error("Error al consumir el Api web de alumnos " + error_rx) },
    next: (listaAlumnosRx: Array<Alumno>) => {
      listaAlumnosRx.forEach(alumno => {
        console.log(` ID ${alumno.id} NOMBRE ${alumno.nombre} EDAD ${alumno.edad} `);
      })
      this.listaAlumnos = listaAlumnosRx;
    }
  }
 } 
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    console.log("ngOnDestroy del componente lista buena");
  }
  ngOnInit(): void {
    //aquí llamamos al servicio
    //this.alumnoService.listadoAlumnos().subscribe(this.observerListaAlumnos);
    this.listaPendiente = true;
    this.obtenerPagina()
  }

  paginar (evento:PageEvent)
  {
    console.log("PAGINAR");

    this.paginaActual = evento.pageIndex;
    this.totalPorPagina = evento.pageSize;
    this.listaPendiente = true;
    this.obtenerPagina();
  }

  obtenerPagina ()
  {
    this.alumnoService.listadoAlumnosPorPaginas(this.paginaActual, this.totalPorPagina).subscribe(
      {
       next: respuesta => {
         //console.log('Observer got a next value: ' + respuesta)
         this.listaAlumnos = respuesta.content as Alumno[];
         this.totalRegistros = respuesta.totalElements;
         this.listaPendiente = false;
         //this.listaAlumnos = <Alumno[]> respuesta.content;//casting
       },
       error: err => console.error('Observer got an error: ' + err),
       complete: () => console.log('Observer got a complete notification'),
     }
   )

  }

}
