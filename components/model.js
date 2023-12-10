export class Model {
  constructor({ getMemesForView, getMemesForStorage }) {
    this.getMemesForView = getMemesForView;
    this.getMemesForStorage = getMemesForStorage;
    this.memes = [];
    this.selectedMem = null;
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

    console.log('Memes: ', this.memes);
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

  findMemById(id) {
    if (this.selectedMem) {
      this.updateMemesListItem();
    }
    this.selectedMem = this.memes.find((mem) => mem.id === id);
    return this.selectedMem;
  }

  updateMemesListItem() {
    let memIndex = this.memes.findIndex((mem) => mem.id === this.selectedMem.id);
    if (memIndex !== -1) {
      this.memes[memIndex] = this.selectedMem;
    } else {
      throw new Error('В массиве мемов такой элемент не найден');
    }
  }
}
