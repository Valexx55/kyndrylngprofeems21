import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Credenciales } from '../../model/credenciales';
import { AutenticacionService } from '../../services/autenticacion.service';
import { HttpResponse } from '@angular/common/http';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-acceso',
  imports: [FormsModule, RouterLink],
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css'
})
export class AccesoComponent {

  nombreUsuario!:string;
  password!:string;
  router:Router = inject(Router);
  autService:AutenticacionService = inject(AutenticacionService)
  tokenService:TokenService = inject(TokenService)

  onLogin()
  {
    let credenciales:Credenciales = new Credenciales();
    credenciales.password = this.password;
    credenciales.user = this.nombreUsuario;

    //TODO: Autenticarme con el servidor
    this.autService.login(credenciales).subscribe({
      complete: () => console.log("Com completada"),
      error: (error) => console.error("Error " + error),
      next: (response:HttpResponse<any>) => {
        console.log("Login Exitoso!");
        //accedemos a las cabeceras
        console.log(`Status = ${response.status}`);
        let claves = response.headers.keys();
        claves.forEach(clave => {
          console.log(`Clave ${clave} = ${response.headers.get(clave)}`);
        
        })
        //guardar la credencial
        let token = response.headers.get("Authorization") ?? '';
        this.tokenService.setToken(token);
        //navegar al listado del alumnos
        this.router.navigateByUrl("/listadoAlumnos");
      }
    })
  }


}
