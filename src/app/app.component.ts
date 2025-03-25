import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html', //estructura visual , contenido HTML
  styleUrl: './app.component.css' //estilo de este trozo de página Compoennte
})
export class AppComponent {
  //aquí va el JavaScript (TS) , lo que da vidilla al Compoennte, la funcionalidad
  title = 'Kyndryl App';
  tokenService = inject(TokenService)

  constructor ()
 {
  console.log("En el constructor de AppComponent");
 } 

 estaLogueado ():boolean
 {
  return this.tokenService.isLogged()
 }

 logout ()
 {
  this.tokenService.logOut();
 }

}
