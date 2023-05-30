import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartasService {

  private apiUrl = 'https://deckofcardsapi.com/api/deck/';


  constructor(private http: HttpClient) { }
  createNewDeck(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/new/shuffle`);
  }

  getRemainingCards(deckId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${deckId}/draw/?count=1`);
  }
  
  getCardImageUrl(code: string): string {
    return `https://deckofcardsapi.com/static/img/${code}.png`;
  }
}
