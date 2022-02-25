import { Component, OnInit } from '@angular/core';
import { telefono } from '../modules/telefono';
import { ArrService } from '../arr.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../carr.service';
import { NgForm } from '@angular/forms';
let telefoniAcquistati;
@Component({
  selector: 'app-carrello',
  template: `
<div *ngIf="telefoniAcquistati.length>0">
  <div class="container">
      <h2>Articoli</h2>
      <ul class="list-group" *ngFor="let telefono of telefoniAcquistati">
      <li class="list-group-item"><strong>{{telefono.name}}</strong><button  class="btn btn-primary prezzi">{{telefono.price}} $</button> </li>
    </ul>

    <h2>Completa ordine</h2>
    <form (ngSubmit)="submit(form)" #form="ngForm" >
      <label for="nome">Nome</label>
      <input ngModel type="text" name="nome" id="nome"><br>
      <label for="indirizzo">Indirizzo</label>
      <input ngModel type="text" name="indirizzo" id="indirizzo"><br>
      <button class="btn btn-primary" type="submit">Invia</button><br>
    </form>
  </div>
</div>
<div *ngIf="telefoniAcquistati.length<=0">
  <h2>Carrello vuoto...</h2>
</div>
  `,
  styles: [

  ]
})
export class CarrelloComponent implements OnInit {
  id = 0;
  telefono!: telefono;
  sub!: Subscription
  arrService;
  cartService;
  telefoni!: telefono[] | any;
  telefoniAcquistati!: telefono[];

  constructor(http: HttpClient, private router: ActivatedRoute) {
    this.arrService = new ArrService(http);
    this.cartService = new CartService(this.arrService);
  }
  full() {
    return this.arrService.full();
  }
  ngOnInit() {
    this.sub = this.full().subscribe(ris => {
      this.telefoni = ris;
      this.sub = this.router.params.subscribe((params: Params) => {
        if (params['id'] == null) {
          this.telefoniAcquistati = this.cartService.getCarrello();
        }
        else if (this.telefoniAcquistati == undefined) {
          this.id = params['id'];
          this.id--;
          this.telefono = this.telefoni[this.id];
          this.cartService.inviaCarrello(this.telefono);
          this.telefoniAcquistati = this.cartService.getCarrello();
          telefoniAcquistati = this.telefoniAcquistati
        } else {
          this.id = params['id'];
          this.id--;
          this.telefono = this.telefoni[this.id];
        }
      })
    })
  }
  submit(f: NgForm) {
    console.log(f.value);
    this.cartService.svuota();
    this.telefoniAcquistati = this.cartService.getCarrello();
  }
}
