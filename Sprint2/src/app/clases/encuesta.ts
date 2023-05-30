import { Timestamp } from "firebase/firestore";

export class Encuesta {
    usuario:string;
    nombre: string;
    apellido: string;
    edad: number;
    telefono: string;
    inputPreferido: string;
    recomendacion: string;
    jugados: string[];
    fecha:string;

    constructor(usuario:string, nombre: string, apellido: string, edad: number, telefono:string, inputPreferido: string, recomendacion: string, jugados:string[],fecha:string) {
        this.usuario = usuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.telefono = telefono;
        this.inputPreferido = inputPreferido;
        this.recomendacion = recomendacion;
        this.jugados = jugados;
        this.fecha = fecha;
    }
    toFirestoreObject() {
        return {
            usuario: this.usuario,
            nombre: this.nombre,
            apellido: this.apellido,
            edad: this.edad,
            telefono: this.telefono,
            inputPreferido: this.inputPreferido,
            recomendacion: this.recomendacion,
            jugados: this.jugados,
            fecha:this.fecha
        };
    }
    
 

    
}
