import { Component, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CartasService } from 'src/app/servicios/cartas.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnDestroy {
  cards: any[] = [];
  deckId: string = "";
  carta: any;
  cartaPrevia: any;
  aciertos: number = 0;
  vidas: number = 3;
  mayorCantidadAciertos=0;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private cartasService: CartasService, private firebase: FirestoreService) { }

   async ngOnInit() {
     
       this.volverAJugar();
  }

  cartaSiguiente(eligioMayor: boolean) {
    if (this.vidas > 0) {

      if (this.carta) {
        this.cartaPrevia = this.carta;
      }
      this.cartasService.getRemainingCards(this.deckId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((carta) => {
        this.carta = carta.cards[0];
        this.puntuarAcierto(this.carta, this.cartaPrevia, eligioMayor);
      });
    }
  }
  puntuarAcierto(cartaActual: any, cartaPrevia: any, elegioMayor: boolean) {

    if (this.vidas > 0) {

      let cartaActualNumber = parseInt(cartaActual.value);
      let cartaPreviaNumber = parseInt(cartaPrevia.value);

      if (isNaN(cartaActualNumber)) {
        switch (cartaActual.value) {
          case 'ACE':
            cartaActualNumber = 1;
            break;
          case 'JACK':
            cartaActualNumber = 11;
            break;
          case 'QUEEN':
            cartaActualNumber = 12;
            break;
          case 'KING':
            cartaActualNumber = 13;
            break;
        }
      }

      if (isNaN(cartaPreviaNumber)) {
        switch (cartaPrevia.value) {
          case 'ACE':
            cartaPreviaNumber = 1;
            break;
          case 'JACK':
            cartaPreviaNumber = 11;
            break;
          case 'QUEEN':
            cartaPreviaNumber = 12;
            break;
          case 'KING':
            cartaPreviaNumber = 13;
            break;
        }
      }

      console.log(cartaActual, cartaActual.value, cartaActualNumber);
      console.log(cartaPrevia, cartaPrevia.value, cartaPreviaNumber);

      if (cartaActualNumber > cartaPreviaNumber) {
        if (elegioMayor) {
          this.firebase.toastNotificationSuccess('Adivinaste era mayor');
          this.aciertos++;
        } else {
          this.vidas--;
          this.firebase.toastNotificationWarning('Error era mayor');
        }
      } else if (cartaActualNumber < cartaPreviaNumber) {
        if (!elegioMayor) {
          this.firebase.toastNotificationSuccess('Adivinaste era menor');
          this.aciertos++;
        } else {
          this.firebase.toastNotificationWarning('Error era menor');
          this.vidas--;
        }
      }

      if (this.vidas <= 0) {

        if(this.aciertos>0)
        {

          this.firebase.showAlertSucces('Victoria','Lograste obtener '+ this.aciertos +' aciertos.');
        }else{
          
          this.firebase.showAlertDanger('Derrota','No lograste ningun acierto.');
        }
        

        this.firebase.uploadScoreMayorMenor(this.aciertos);
      }
    }
  }

  async volverAJugar(){
    this.aciertos=0;
    this.vidas=3;
    await this.cartasService.createNewDeck().pipe(
      takeUntil(this.unsubscribe$)
      ).subscribe(
        response => {
          this.deckId = response.deck_id;
          this.cartasService.getRemainingCards(this.deckId).pipe(
            takeUntil(this.unsubscribe$)
            ).subscribe(
              response => {
                this.cards = response.cards;
                this.cartasService.getRemainingCards(this.deckId).pipe(
                  takeUntil(this.unsubscribe$)
                  ).subscribe((carta) => {
                    this.carta = carta.cards[0];
                  });
                },
                error => {
                  console.log('Error retrieving cards:', error);
                }
                );
              },
       error => {
         console.log('Error creating new deck:', error);
        }
        );
        this.mayorCantidadAciertos = await this.firebase.getMayorAciertos();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
