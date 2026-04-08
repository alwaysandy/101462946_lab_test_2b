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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { A } from '@angular/cdk/keycodes';

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
    ReactiveFormsModule,
  ],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList {
  private readonly api = inject(HarryPotterApi);
  characterList = signal<HarryPotterCharacter[]>([]);

  houseForm = new FormGroup({
    selectedHouse: new FormControl(null),
  });
  options = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];

  ngOnInit(): void {
    this.loadCharacters();
    this.houseForm.controls.selectedHouse.valueChanges.subscribe((val) => {
      if (val === null) {
        this.loadCharacters();
      } else {
        this.loadCharactersByHouse(val);
      }
    });
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
      });
  }

  loadCharactersByHouse(house: string): void {
    this.api
      .getCharactersByHouse(house)
      .pipe(
        catchError((e) => {
          console.error(e);
          return of([] as HarryPotterCharacter[]);
        }),
      )
      .subscribe((characters) => {
        this.characterList.set(characters);
      });
  }
}
