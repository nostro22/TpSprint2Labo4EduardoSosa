import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  api: string = 'https://restcountries.com/v3.1/region/';

  todos(): Observable<any> {
    return this.http.get(this.api + 'americas');
    
  }

  pais(nombrePais:string): Observable<any>{
    return this.http.get(this.api +'name/' + nombrePais);
    
  }
}
