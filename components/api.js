export class Api {
  constructor() {
    this.url = 'https://api.imgflip.com/get_memes';
  }

  /**
   * Получает мемы из апи
   */
  async getMemesFromApi() {
    try {
      const response = await fetch(this.url);
      if (response.ok) {
        const memes = await response.json();
        return memes.success ? memes.data.memes : null;
      }
    } catch (error) {
      throw new Error(`Что-то пошло не так: ${error}`);
    }
  }
}
