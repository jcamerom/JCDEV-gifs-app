import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { GifsModule } from './gifs/gifs.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    GifsModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient()  // Agregar este proveedor para usar HttpClientModule en cualquier módulo.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
