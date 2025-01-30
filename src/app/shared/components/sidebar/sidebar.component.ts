import { Component, Input } from '@angular/core';

import { GifsService } from '../../../gifs/services/gifs.service';
import { Gif } from '../../../gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  // Inyectar servicio GifsService privado
  constructor(private gifsService: GifsService) {}

  // Implícitamente, tags es una variable de tipo string
  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  searchTag(tag: string): void{
    this.gifsService.searchTag(tag);
  }
}


