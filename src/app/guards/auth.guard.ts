import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  console.log("estamos en la guardia");
  let tokenService: TokenService = inject(TokenService);
  let puede : boolean = false;
  puede = tokenService.isLogged();
  if (!puede)
    {
      alert('Debe autenticarse para acceder a esta opción')
    } 
  return puede;

};
