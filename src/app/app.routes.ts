import { Routes } from '@angular/router';
import { ListadoAlumnosComponent } from './components/listado-alumnos/listado-alumnos.component';
import { FormularioAlumnoComponent } from './components/formulario-alumno/formulario-alumno.component';
import { BusquedaAlumnoComponent } from './components/busqueda-alumno/busqueda-alumno.component';
import { ListaAlumnosBuenaComponent } from './components/lista-alumnos-buena/lista-alumnos-buena.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { authGuard } from './guards/auth.guard';

//esto es un array, que establece
//la correspondencia entre
//RUTA/URL local y componente
export const routes: Routes = [
   {path:'alumnos', component: ListadoAlumnosComponent},
  {path:'formulario', component: FormularioAlumnoComponent, canActivate: [authGuard]}, 
  {path:'formulario/edit/:idAlumno', component: FormularioAlumnoComponent, canActivate: [authGuard]},
  {path:'busqueda', component: BusquedaAlumnoComponent,  canActivate: [authGuard]},
  {path:'listadoAlumnos', component: ListaAlumnosBuenaComponent,  canActivate: [authGuard]},
  {path:'signup', component: RegistroComponent},
  {path:'login', component: AccesoComponent},
  {path:'home', component: AccesoComponent },
  {path:'', redirectTo: 'home', pathMatch: 'full'}

];
