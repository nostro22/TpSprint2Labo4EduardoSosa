import { Timestamp } from "firebase/firestore";

export class Pelicula {
    id: string;
    nombre: string;
    tipo: Array<string>;
    fechaDeEstreno: Date;
    cantidadDePublico: number;
    fotoPelicula: string;

    constructor(id: string, nombre: string, tipo: Array<string>, fechaEstreno: Date, cantidadDePublico: number, foto: string) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.fechaDeEstreno = fechaEstreno;
        this.cantidadDePublico = cantidadDePublico;
        this.fotoPelicula = foto;
    }
    toFirestoreObject() {
        return {
            id: this.id,
            nombre: this.nombre,
            tipo: this.tipo,
            fechaDeEstreno: this.fechaDeEstreno,
            cantidadDePublico: this.cantidadDePublico,
            fotoDeLaPelicula: this.fotoPelicula
        };
    }

    setId(id:string)
    {
        this.id=id;
    }

    
}
