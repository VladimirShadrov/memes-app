export class Model {
  constructor({ getMemesForView, getMemesForStorage }) {
    this.getMemesForView = getMemesForView;
    this.getMemesForStorage = getMemesForStorage;
    this.memes = [];
  }
  /**
   * Обрабатывает массив мемов и передает в View и Storage
   * @param {Object[]} memesList
   * @param {String} flag
   */
  getMemesList = (memesList, flag) => {
    switch (flag) {
      case 'storage':
        this.memes = memesList;
        this.getMemesForView(this.memes);
        break;
      case 'api':
        this.memes = this.mapMemesList(memesList);
        this.getMemesForView(this.memes);
        this.getMemesForStorage(this.memes);
        break;
    }
  };

  /**
   * Обрабатывает массив мемов из Api, и забирает из него необходимые свойства
   * @param {Object[]} memesList - Массив мемов
   * @returns {Object[]}
   */
  mapMemesList(memesList) {
    return memesList.slice(0, 50).map((mem) => {
      const { id, name, url } = mem;
      return {
        id,
        name,
        url,
        textTop: '',
        textBottom: '',
      };
    });
  }
}
