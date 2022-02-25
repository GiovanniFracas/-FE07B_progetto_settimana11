import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subscription} from 'rxjs';
import { telefono } from '../modules/telefono';
import { ArrService } from '../arr.service';

@Component({
  selector: 'app-home',
  template: `
   <div *ngFor="let telefono of telefoni" class="container">
     <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{telefono.name}}</h5>
          <p class="card-text">{{telefono.description}}</p>
          <a [routerLink]="['/dettagli' ,telefono.id]" class="btn btn-primary" >dettagli</a>
        </div>
      </div>
   </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  telefoni!: telefono[];
  arrService;
  constructor(private http: HttpClient) {
    this.arrService = new ArrService(http);
  }

  full(){
    return this.arrService.full();
  }
  BaseUrl = 'http://localhost:4201';

  ngOnInit() {
    this.sub=this.full().subscribe(ris=>{
      this.telefoni=ris;
         console.log(this.telefoni);
    });
  }
  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
