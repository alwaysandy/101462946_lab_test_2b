import { Component, inject, signal } from '@angular/core';
import { HarryPotterCharacter } from '../models/harry-potter-character.model';
import { HarryPotterApi } from '../network/harry-potter-api';
import { catchError, finalize, of } from 'rxjs';
import {
  MatCard,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { HouseFormatPipe } from '../house-format-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-list',
  imports: [
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    NgOptimizedImage,
    HouseFormatPipe,
    RouterLink,
  ],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList {
  private readonly api = inject(HarryPotterApi);
  characterList = signal<HarryPotterCharacter[]>([]);

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.api
      .getCharacters()
      .pipe(
        catchError((e) => {
          console.error(e);
          return of([] as HarryPotterCharacter[]);
        }),
      )
      .subscribe((characters) => {
        this.characterList.set(characters);
        console.log(this.characterList);
      });
  }
}
