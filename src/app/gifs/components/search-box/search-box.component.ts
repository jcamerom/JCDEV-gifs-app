import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from './../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: 'search-box.component.html'
})

export class ShareBoxComponent {

  // @ViewChild hace referencia a un elemento HTML y lo convierte en una referencia de Angular
  // @ViewChildren también puede ser usado para seleccionar varios elementos HTML y enviarlos como un array de referencias de Angular
  @ViewChild('txtTagInput')
  // ElementRef<HTMLInputElement es un tipo (o interfaz) que representa un elemento HTML
  // Podría representar un nulo, por eso se declara como '!' para indicar que no puede ser nulo
  public tagInput!: ElementRef<HTMLInputElement>

  // Para introducir el servicio, se coloca como parámetro del constructor
  constructor(private gifsService: GifsService) { }

  searchTag() {
    // Como enviamos un ElementRef, podemos acceder a sus propiedades y métodos como si fueran una referencia normal
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    // ESto es para volver a limpiar el value y poder reciclarlo
    this.tagInput.nativeElement.value = '';
  }
}
