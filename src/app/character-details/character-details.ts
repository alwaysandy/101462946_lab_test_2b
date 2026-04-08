import { Component, inject, Input, signal } from '@angular/core';
import { HarryPotterApi } from '../network/harry-potter-api';
import { HarryPotterCharacter } from '../models/harry-potter-character.model';
import { catchError, map, of } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { HouseFormatPipe } from '../house-format-pipe';

@Component({
  selector: 'app-character-details',
  imports: [
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    HouseFormatPipe,
    MatCardContent,
    NgOptimizedImage,
    MatCard,
    MatCardImage,
  ],
  templateUrl: './character-details.html',
  styleUrl: './character-details.css',
})
export class CharacterDetails {
  @Input() id!: string;
  private readonly api = inject(HarryPotterApi);
  details = signal<HarryPotterCharacter>({} as HarryPotterCharacter);

  ngOnInit(): void {
    this.loadCharacterById();
  }

  loadCharacterById(): void {
    this.api
      .getCharacterById(this.id)
      .pipe(
        map((details) => details[0]),
        catchError((e) => {
          console.error(e);
          return of({} as HarryPotterCharacter);
        }),
      )
      .subscribe((details) => {
        this.details.set(details);
      });
  }
}
