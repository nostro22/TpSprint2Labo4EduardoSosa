import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent implements OnInit {
  readmeContent: string = '';
public descripcionJuegoContent ="";
  constructor(private http: HttpClient,private router :Router) { }

  ngOnInit() {
    const url = 'https://api.github.com/repos/nostro22/Nostro22/contents/README.md';
    const options = {
      headers: { Accept: 'application/vnd.github.v3.raw' },
      responseType: 'text' as 'json' // Cast the value to the expected type
    };

    this.http.get(url, options).subscribe((data: any) => {
      const content = data; // The response is already the content

      // Find the index of the "Descripción Juego" section
      const descripcionJuegoIndex = content.indexOf('## Descripción Juego');

      if (descripcionJuegoIndex !== -1) {
        // Extract the content from the "Descripción Juego" section
        this.descripcionJuegoContent = content.substring(descripcionJuegoIndex);

        // Print the "Descripción Juego" content
        console.log(this.descripcionJuegoContent);
      } else {
        console.log('Sección "Descripción Juego" no encontrada.');
      }
    });
  }
}
