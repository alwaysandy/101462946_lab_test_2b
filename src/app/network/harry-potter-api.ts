import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HarryPotterCharacter } from '../models/harry-potter-character.model';

@Injectable({
  providedIn: 'root',
})
export class HarryPotterApi {
  private readonly httpClient = inject(HttpClient);

  public getCharacters(): Observable<HarryPotterCharacter[]> {
    return this.httpClient.get<HarryPotterCharacter[]>(
      'https://hp-api.onrender.com/api/characters',
    );
  }

  public getCharactersById(id: number): Observable<HarryPotterCharacter> {
    return this.httpClient.get<HarryPotterCharacter>(
      `https://hp-api.onrender.com/api/character/${id}`,
    );
  }
}
