export interface HarryPotterCharacter {
  id: number;
  name: string;
  species: string;
  house: string;
  wizard: boolean;
  ancestry: string;
  wand: Wand;
  actor: string;
  image: string;
}

interface Wand {
  wood: string;
  core: string;
  length?: number;
}
