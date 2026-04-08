import { Routes } from '@angular/router';
import { CharacterDetails } from './character-details/character-details';
import { CharacterList } from './character-list/character-list';

export const routes: Routes = [
  { path: '', component: CharacterList },
  { path: 'details/:id', component: CharacterDetails, title: 'Details' },
];
