import { Injectable } from '@angular/core';
import { ArrService } from './arr.service';
import { telefono } from './modules/telefono';

export let carrello: telefono[] = [];
export let contatore: number = 0;
@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(public arrService: ArrService) { }
  inviaCarrello(prod: telefono) {
    carrello.push(prod);
    this.incrementaCarrello();
  }
  incrementaCarrello() {
    contatore++;
  }
  getCarrello() {
    return carrello
  }
  svuota() {
    carrello = [];
    contatore = 0;
  }
}
