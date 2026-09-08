export interface ThronesCharacter {
  id: number;
  imageUrl: string;
}

export interface Card {
  uid: string;
  charId: number;
  img: string;
}

export interface LevelConfig {
  pairs: number;
  time: number;
}
