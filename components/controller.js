import { View } from './view.js';
import { Model } from './model.js';
import { Api } from './api.js';
import { Storage } from './storage.js';

export class Controller {
  constructor() {
    this.view = new View();
    this.model = new Model({
      getMemesForView: this.getMemesForView,
      getMemesForStorage: this.getMemesForStorage,
    });
    this.api = new Api();
    this.storage = new Storage();

    this.getMemesForModel();
  }

  /**
   * Получает массив мемов для модели
   */
  async getMemesForModel() {
    let memesList;
    if (this.storage.memesList && this.storage.memesList.length) {
      memesList = this.storage.memesList;
      this.model.getMemesList(memesList, 'storage');
    } else {
      memesList = await this.api.getMemesFromApi();
      this.model.getMemesList(memesList, 'api');
    }
  }

  /**
   * Получает из модели список мемов для View
   * @param {Object[]} memes - Массив объектов с мемами
   */
  getMemesForView = (memes) => {};

  /**
   * Получает из модели список мемов для Storage
   * @param {Object[]} memes - Массив объектов с мемами
   */
  getMemesForStorage = (memes) => {
    this.storage.saveMemesList(memes);
  };
}
