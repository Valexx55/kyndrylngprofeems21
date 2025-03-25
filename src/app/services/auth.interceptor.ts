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
    console.log('Esta logueado');
    let token = tokenService.getToken() ?? '';
    //TODO: incluir el token en la request
    let nuevareq = req.clone({headers: req.headers.append('Authorization', token)})
    console.log('Cabecera añadida, le dejo pasar');
    return next(nuevareq); //TODO: controlar la respuesta y si es un 401, hacer el refresco
  } else {
    console.log('No Esta logueado');
    return next(req); 
  }
  
};
