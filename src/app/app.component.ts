import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  RouterLink, RouterLinkActive],
  templateUrl: './app.component.html', //estructura visual , contenido HTML
  styleUrl: './app.component.css' //estilo de este trozo de página Compoennte
})
export class AppComponent {
  //aquí va el JavaScript (TS) , lo que da vidilla al Compoennte, la funcionalidad
  title = 'Kyndryl App';

  constructor ()
 {
  console.log("En el constructor de AppComponent");
 } 
}
