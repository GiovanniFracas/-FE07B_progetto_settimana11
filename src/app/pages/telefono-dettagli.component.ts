import { Component, OnDestroy, OnInit } from '@angular/core';
import { telefono } from '../modules/telefono';
import { ArrService } from '../arr.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-telefono-dettagli',
  template: `

     <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{telefono.name}}</h5>
          <p class="card-text">{{telefono.description}}</p>
          <a [routerLink]="['/carrello',telefono.id,telefono.name,telefono.price]" class="btn btn-primary" >aggiungi al carrello</a>
        </div>
      </div>
  `,
  styles: [
  ]
})
export class TelefonoDettagliComponent implements OnInit, OnDestroy {
  id: number | any;
  telefono:telefono | any;
  telefonini: any;
  arrService;
  sub: any;

  constructor(http: HttpClient, private router: ActivatedRoute) {
    this.arrService = new ArrService(http);
  }

  full() {
    return this.arrService.full();
  }

  ngOnInit() {
    this.sub = this.full().subscribe(ris => {
      this.telefonini = ris;
      this.sub = this.router.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.telefono=this.telefonini[this.id-1];
      });
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
