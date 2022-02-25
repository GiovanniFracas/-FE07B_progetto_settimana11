import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { telefono } from './modules/telefono';

@Injectable({
  providedIn: 'root'
})
export class ArrService {
  sub!: Subscription;
  public telefons!: telefono[];
  BaseUrl = 'http://localhost:4201';
  constructor(private http: HttpClient) { }
  full() {
   return this.http.get<telefono[]>(`${this.BaseUrl}/products`);
  }
}
