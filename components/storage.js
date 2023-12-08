export class Storage {
  constructor() {
    this.memes = JSON.parse(localStorage.getItem('memes'));
  }

  /**
   * Сохраняет массив мемов в localStorage
   * @param {Object[]} memes - Массив мемов
   */
  saveMemesList(memes) {
    localStorage.setItem('memes', JSON.stringify(memes));
  }

  /**
   * Возвращает массив мемов
   */
  get memesList() {
    return this.memes;
  }
}
