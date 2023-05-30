import { Component, HostListener, ElementRef } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-juego-propio',
  templateUrl: './juego-propio.component.html',
  styleUrls: ['./juego-propio.component.css']
})
export class JuegoPropioComponent {
  circles: Circle[] = [];
  score = 0;
  playing = false;
  public bestScore: any;

  constructor(private elementRef: ElementRef, private firebase: FirestoreService) { }

  async ngOnInit() {
    this.bestScore = await this.firebase.getPersonalBestAsteroides();
  }

  handleCircleClick(circle: Circle) {
    if (this.playing && !circle.clicked) {
      circle.clicked = true;
      this.score++;
    }
  }

  resetGame() {
    this.score = 0;
    this.playing = true;
    this.circles = [];
    this.generateCircles();
    this.startGameOverTimer();
  }

  startGameOverTimer() {
    setTimeout(() => {
      this.playing = false;
      if (this.score > 0) {
        this.firebase.showAlertSucces('Victoria!!', 'Destruiste ' + this.score + ' 🌑');
        this.firebase.uploadScoreAsteroides(this.score);
      }
      else {
        this.firebase.showAlertDanger('Derrota!!', ' No destruiste ningun  🌑');
      }
    }, 10000); // 15 seconds (15000 milliseconds)
  }

  generateCircles() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const circleCount = 100; // Adjust the number of circles

    for (let i = 0; i < circleCount; i++) {
      let top = Math.floor(Math.random() * (screenHeight * 0.5));
      if (top < screenHeight * 0.1) {
        top = screenHeight * 0.1;
      }
      const left = Math.floor((screenWidth * 0.1) + Math.random() * (screenWidth * 0.5));
      const animationDelay = Math.random() * 5; // Adjust the maximum delay value
      const circle: Circle = {
        top: top,
        left: left,
        clicked: false,
        animationDelay: animationDelay
      };
      this.circles.push(circle);
    }
  }
}

interface Circle {
  top: number;
  left: number;
  clicked: boolean;
  animationDelay: number;
}
