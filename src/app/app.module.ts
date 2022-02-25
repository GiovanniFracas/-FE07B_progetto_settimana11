import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home.component';
import { TelefonoDettagliComponent } from './pages/telefono-dettagli.component';
import { ArrService } from './arr.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CarrelloComponent } from './pages/carrello.component';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dettagli/:id',
    component: TelefonoDettagliComponent
  },{
  path:'carrello/:id/:name/:price',
  component:CarrelloComponent
}
  ,
  {
  path:'carrello',
  component:CarrelloComponent
}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TelefonoDettagliComponent,
    NavbarComponent,
    CarrelloComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule

  ],
  providers: [ArrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
