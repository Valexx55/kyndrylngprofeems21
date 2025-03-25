import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let tokenService = inject(TokenService);
  //si esta logueado, añado el token
  //si no, le dejo apsar si más
  console.log("Pasando por el interceptor");
  if (tokenService.isLogged())
  {
    let token = tokenService.getToken() ?? '';
    //TODO: incluir el token en la request
  }
  return next(req);
};
