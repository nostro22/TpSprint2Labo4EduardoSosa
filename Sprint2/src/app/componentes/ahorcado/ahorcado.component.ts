import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {
  palabras: string[]  = [
    "variable",
    "funcion",
    "clase",
    "objeto",
    "metodo",
    "bucle",
    "condicion",
    "arreglo",
    "cadena",
    "booleano",
    "si",
    "para",
    "mientras",
    "switch",
    "caso",
    "retornar",
    "intentar",
    "capturar",
    "lanzar",
    "importar",
    "exportar",
    "paquete",
    "publico",
    "privado",
    "protegido",
    "estatico",
    "final",
    "abstracto",
    "interfaz",
    "extiende",
    "implementa",
    "super",
    "esto",
    "nulo",
    "verdadero",
    "falso",
    "nuevo",
    "instancia",
    "tipo",
    "constante",
    "permitir",
    "esperar",
    "asincrono"
]

  palabrasAdivinadas="0";
  palabra: string = '';
  public letrasAdivinadas: string[] = [];
  intentos: number = 6;
  jugando=true;

  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.obtenerPalabraAleatoria();
  }

  async obtenerPalabraAleatoria(): Promise<void> {
    this.palabrasAdivinadas = await this.firestore.getPalabrasAdivinadas();
    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.letrasAdivinadas = [];
    this.intentos = 6;
    this.jugando = true;
  }


  imagenAhorcado(){
 switch (this.intentos) {
  case 0:
    return "../../../assets/0.png"
    
    break;
  case 1:
    return "../../../assets/1.png"
    
    break;
  case 2:
    return "../../../assets/2.png"
    
    break;
  case 3:
    return "../../../assets/3.png"
    
    break;
  case 4:
    return "../../../assets/4.png"
    
    break;
  case 5:
    return "../../../assets/5.png"
    
    break;
     
    default:
    return "../../../assets/6.png"
    break;
 }
  }

  verificarLetra(letra: string): void {
    letra = letra.toLowerCase();

   

    if (this.palabra.includes(letra)) {
      
      this.letrasAdivinadas.push(letra);

      if (this.ganoJuego()) {

        this.firestore.showAlertSucces('¡Felicidades!',' ¡Has adivinado la palabra correctamente!');
        this.firestore.uploadScoreAhorcado(this.palabra);
        this.obtenerPalabraAleatoria();
      }
    } else {
      this.intentos--;
      if(this.intentos>3)
      {
        this.firestore.toastNotificationInfo('Cuidado te quedan ' + this.intentos);
      }
      else{
        this.firestore.toastNotificationWarning('Cuidado te quedan ' + this.intentos);
      }

      if (this.intentos === 0) {
        this.firestore.showAlertDanger('¡Oh no!',' Has perdido. La palabra correcta era "' + this.palabra + '".');
        this.jugando=false;
        //this.obtenerPalabraAleatoria();
      }
    }
  }

  letrasDisponibles(): string[] {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    const letrasAdivinadas = this.letrasAdivinadas.map(letra => letra.toLowerCase());
  
    return letras.split('').filter(letra => !letrasAdivinadas.includes(letra));
  }
  
  ganoJuego(): boolean {
    for (let letra of this.palabra) {
      if (!this.letrasAdivinadas.includes(letra)) {
        return false;
      }
    }
    return true;
  }

  volverAJugar(){
    this.obtenerPalabraAleatoria();
  }
}


