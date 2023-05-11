import { Timestamp } from "firebase/firestore";

export class Usuario {
    id:string;
    email: string;
    nombre: string;
    apellido: string;
    edad: number;
    sexo: string;
    foto: string;

    constructor(id:string, email: string, nombre: string, apellido: string, edad: number, sexo: string, foto: string) {
        this.id = id;
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.sexo = sexo;
        this.foto = foto;
    }
    toFirestoreObject() {
        return {
            _id: this.id,
            email: this.email,
            nombre: this.nombre,
            apellido: this.apellido,
            edad: this.edad,
            sexo: this.sexo,
            foto: this.foto
        };
    }
    
    getId() {
        return this.id;
    }
    setId(value:string) {
        this.id = value;
    }

    
}
