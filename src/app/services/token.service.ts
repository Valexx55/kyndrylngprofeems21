import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


/**
 * Esta clase gestiona el almacenamiento del token
 * JWT
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router:Router) { }

  public setToken (token:string)
  {
    window.sessionStorage.removeItem("TOKEN")
    window.sessionStorage.setItem("TOKEN", token)
  }

  public getToken ():string |null
  {
    return window.sessionStorage.getItem("TOKEN") //?? ''; Nullish coalescing
  }

  public isLogged():boolean
  {
    return (this.getToken()!=null);
  }

  public logOut() {
    window.sessionStorage.clear();
    //le dirigimos al component de acceso/login
    this.router.navigateByUrl("/login");
  }

  //TODO: opcional obtener datos del usuario en claro a partir del token base64


}
