import { Language } from './language';

export class Film {
  filmId: number;
  title: string;
  description: number;
  releaseYear: string;
  rentalDuration: number;
  rentalRate: number;
  length: number;
  replacementCost: number;
  rating: string;
  specialFeatures: string;
  lastUpdate: string;
  languageId: Language;
  originalLanguageId: Language;
}
