import { Gif, SearchResponse } from './../interfaces/gifs.interfaces';


import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


// El providedIn sirve para especificar donde se va a proporcionar este servicio, que es en este caso en el módulo raíz de la aplicación
// para que Angular pueda inyectarlo en cualquier componente de la aplicación
@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  // Private es para impedir que esta propiedad sea modificada desde fuera de este servicio
  private _tagsHistory: string[] = [];
  private apiKey: string = 'wXjOafSScLz2DwB6KhlmQ2Cg5jYSj6vU';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  // En el constructor se inyecta HttpClient para hacer las peticiones HTTP
  constructor(private http: HttpClient) {
    // Cargamos los tags del historial desde el localStorage
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    // Para evitar romper la referencia al array original
    // Tiene mayor control y seguridad de datos
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    // Sort ordena el array en orden alfabético
    tag = tag.toLowerCase();
    // Si el tag ya está en el historial, lo eliminamos para evitar duplicados
    if (this._tagsHistory.includes(tag)) {
      // filter devuelve un nuevo array con los elementos que pasan la condición
      this._tagsHistory = this._tagsHistory.filter((oldTag: string) => oldTag!== tag);
    }
    // Añadimos el tag al principio del array
    this._tagsHistory.unshift(tag);
    // Limitamos el tamaño del array a 10 para mantener solo los 10 últimos tags
    this._tagsHistory = this._tagsHistory.slice(0, 10);
    // Ordenamos el array para que se mantenga en orden alfabético
    this._tagsHistory.sort();

    this.saveLocalStorage();
  }

  // LocalStorage guarda los datos en el navegador del usuario
  private saveLocalStorage(): void {
    // El método JSON.stringify convierte un objeto JavaScript a una cadena JSON
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    // Si no hay datos en el localStorage, no hacemos nada
    if (!localStorage.getItem('tagsHistory')) return;
    // El método JSON.parse convierte una cadena JSON a un objeto JavaScript
    this._tagsHistory = JSON.parse( localStorage.getItem('tagsHistory')! );
  }

  async searchTag(tag: string): Promise<void> {
    // Evitar añadir un tag vacío al historial
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    // Parámetros que se envían a la API para buscar GIFs por el tag
    const params = new HttpParams()
       .set('api_key', this.apiKey)
       .set('q', tag)
       .set('limit', '10');

    // Un observable emite un valor cuando se completa la promesa.
    // Cuando se dice "suscribirse" a un observable, se ejecuta la función que se pasa como argumento
    // para cada valor emitido por el observable
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
     .subscribe(resp => {
       // Añadimos los GIFs a la lista global
       this.gifList = resp.data;

    });

  }
}
