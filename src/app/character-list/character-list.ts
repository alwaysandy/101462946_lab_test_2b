import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-character-list',
  imports: [MatCardImage, MatCardSubtitle, MatCardTitle, MatCardHeader, MatCard, NgOptimizedImage],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList {
  private readonly api = inject(HarryPotterApi);
  characterList: HarryPotterCharacter[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.isLoading = true;
    this.api
      .getCharacters()
      .pipe(
        catchError((e) => {
          console.error(e);
          return of([] as HarryPotterCharacter[]);
        }),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe((characters) => {
        this.characterList = characters;
        console.log(this.characterList);
      });
  }
}
