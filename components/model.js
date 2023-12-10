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

  /**
   * Находит мем в массиве мемов
   * @param {String} id
   * @returns Данные найденного мема
   */
  findMemById(id) {
    if (this.selectedMem) {
      this.saveMemesListItem();
    }
    this.selectedMem = this.memes.find((mem) => mem.id === id);
    return this.selectedMem;
  }

  /**
   * Сохраняет данные выбранного мема в списке мемов и в localStorage
   */
  saveMemesListItem() {
    let memIndex = this.memes.findIndex((mem) => mem.id === this.selectedMem.id);
    if (memIndex !== -1) {
      this.memes[memIndex] = this.selectedMem;
      this.getMemesForStorage(this.memes);
    } else {
      throw new Error('В массиве мемов такой элемент не найден');
    }
  }

  /**
   * Обновляет данные верхнего текста у выбранного мема
   * @param {String} text
   * @returns верхний текст
   */
  updateTopTextData(text) {
    this.selectedMem.textTop = text;
    return this.selectedMem.textTop;
  }

  /**
   * Обновляет данные нижнего текста у выбранного мема
   * @param {String} text
   * @returns нижний текст
   */
  updateBottomTextData(text) {
    this.selectedMem.textBottom = text;
    return this.selectedMem.textBottom;
  }

  get selected() {
    return this.selectedMem;
  }
}
