import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  private apiUrl = 'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple';


  constructor(private http: HttpClient) { }
  
  createNewQuestionary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }


}
