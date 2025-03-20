export class Alumno {

    id!:number;
    nombre:string;
    apellido:string;
    email:string;
    creadoEn:string; //creadoEn!:string;//!non null operator
    edad:number;
    fotoHashCode!:number;

    constructor()
   {
    //this.id = 0;
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.edad = 0;
    this.creadoEn = '';

   } 
}
