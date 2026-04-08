import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterList } from './character-list/character-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CharacterList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
