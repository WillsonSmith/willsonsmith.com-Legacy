import { filmsFromProfile } from './playwright.js';
export class LetterboxdAPI {
  async getWatchedFilms(userId: string) {
    try {
      return filmsFromProfile(userId);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
