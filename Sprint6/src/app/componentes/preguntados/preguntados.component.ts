import { Component, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import { PreguntadosService } from 'src/app/servicios/preguntados.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnDestroy {
  preguntas: any[] = [];
  preguntaActiva: any = [];
  shuffledOptions: any[] = [];
  indicePregunta: number = 0;
  mejorAciertos:any;
  aciertos = 0;
  mejorTiempo = '';
  elapsedTime = 0;
  startTime: any;
  playing = false;
  timerId: any;

  private unsubscribe$: Subject<void> = new Subject<void>();
  public tiempo = 0;

  constructor(private preguntadosServicio: PreguntadosService, private firebase: FirestoreService) { }

  async ngOnInit() {
   
  }

  startTimer() {
    this.playing = true;
    this.elapsedTime = 0;
    this.startTime = Date.now();
    this.timerId = interval(10).subscribe(() => {
      this.elapsedTime = Date.now() - this.startTime;
    });
  }

  stopTimer() {
    this.timerId.unsubscribe();
  }

  formatTime(time: number): string {
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  async jugar(){
    this.mejorAciertos = await this.firebase.getPersonalBestPreguntados();
    this.startTimer();

    this.preguntadosServicio
      .createNewQuestionary()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (pregunta) => {
          this.preguntas = pregunta.results;
          this.preguntaActiva = this.preguntas[0];
          this.generateShuffledOptions(this.preguntaActiva);
        },
        (error) => {
          console.log('Error retrieving questions:', error);
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  generateShuffledOptions(pregunta: any) {
    const options = [pregunta.correct_answer, ...pregunta.incorrect_answers];
    this.shuffledOptions = this.shuffleArray(options);
  }

  private shuffleArray(array: any[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  opcionSelecionada(opcionSelecionada: any) {
    if (this.playing) {
      if (opcionSelecionada == this.preguntaActiva.correct_answer) {
        this.firebase.toastNotificationSuccess('Correcto 🎇');
        this.aciertos++;
      } else {
        this.firebase.toastNotificationWarning('te equivocaste');
      }
      this.indicePregunta++;
      if (this.indicePregunta < 5) {
        this.preguntaActiva = this.preguntas[this.indicePregunta];
        this.generateShuffledOptions(this.preguntaActiva);
      } else {
        this.playing = false;
        this.stopTimer();
        if(this.aciertos>0)
        {
          this.firebase.showAlertSucces('Fin de la trivia','Lograste '+this.aciertos+ ' aciertos');
        }
        else{
          this.firebase.showAlertDanger('Fin de la trivia','No lograste ningun acierto');
        }
        this.firebase.uploadScorePreguntados(this.aciertos, this.formatTime(this.elapsedTime));
        console.log('Timer stopped');

      }
    }
  }
}
