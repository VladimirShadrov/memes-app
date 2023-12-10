export class View {
  constructor({ notifyAboutSelectedMem, notifyBottomTextChanged, notifyTopTextChanged }) {
    this.notifyAboutSelectedMem = notifyAboutSelectedMem;
    this.notifyTopTextChanged = notifyTopTextChanged;
    this.notifyBottomTextChanged = notifyBottomTextChanged;
    this.$dropdown = document.querySelector('.js-dropdown');
    this.$dropdownHead = this.$dropdown.querySelector('.js-dropdown-head');
    this.$dropdownHeadText = this.$dropdown.querySelector('.js-dropdown-head-text');
    this.$listWrapper = this.$dropdown.querySelector('.js-list-wrapper');
    this.$list = this.$dropdown.querySelector('.js-list');
    this.$topTextInput = document.querySelector('.js-top-text-input');
    this.$bottomTextInput = document.querySelector('.js-bottom-text-input');
    this.$memImage = document.querySelector('.js-mem-image');
    this.$textTop = document.querySelector('.js-text-top');
    this.$textBottom = document.querySelector('.js-text-bottom');
    this.isListOpen = false;
    this.maxTextLength = 50;

    this.addListeners();
  }
  /**
   * Добавляет слушатели событий
   */
  addListeners() {
    this.$list.addEventListener('click', this.selectMem);
    this.$dropdownHead.addEventListener('click', this.showLIst);
    this.$topTextInput.addEventListener('input', this.topTextChanged);
    this.$bottomTextInput.addEventListener('input', this.bottomTextChanged);
    document.addEventListener('click', this.bodyClickHandler);
  }

  /**
   * Выбирает мем из выпадающего списка
   * @param {Event} event
   */
  selectMem = (event) => {
    if (event.target.closest('[data-type="option"]')) {
      this.$dropdownHeadText.innerText = event.target.innerText;
      this.notifyAboutSelectedMem(event.target.dataset.id);
      this.hideList();
    }
  };

  /**
   * Отображает выпадающий список
   */
  showLIst = () => {
    this.$listWrapper.classList.add(this.$listWrapper.dataset.activeClass);
    setTimeout(() => (this.isListOpen = true), 0);
  };

  /**
   * Скрывает выпадающий список
   */
  hideList() {
    this.$listWrapper.classList.remove(this.$listWrapper.dataset.activeClass);
    this.isListOpen = false;
  }

  /**
   * Создает элемент выпадающего списка
   * @param {String} text
   * @param {String} id
   * @returns {HTMLElement}
   */
  getOption(text, id) {
    const option = document.createElement('li');
    option.classList.add('setup__list-item');
    option.innerText = text;
    option.dataset.id = id;
    option.dataset.type = 'option';
    return option;
  }

  /**
   * Заполняет выпадающий список
   * @param {Object[]} list
   */
  renderList(list) {
    list.forEach((option) => {
      const { name, id } = option;
      this.$list.append(this.getOption(name, id));
    });
  }

  /**
   * Отображает данные выбранного мема на странице
   * @param {Object} memData
   */
  setSelectedMem(memData) {
    const { url, textTop, textBottom } = memData;
    this.$memImage.src = url;
    this.$textTop.innerText = textTop;
    this.$textBottom.innerText = textBottom;
    this.$topTextInput.value = textTop;
    this.$bottomTextInput.value = textBottom;
    this.setTextVisibility(this.$topTextInput, this.$textTop);
    this.setTextVisibility(this.$bottomTextInput, this.$textBottom);
  }

  /**
   * Задает видимость для текста, введенного в мем
   * @param {HTMLElement} input
   * @param {HTMLElement} textNode
   */
  setTextVisibility(input, textNode) {
    if (input.value.length) {
      textNode.style.opacity = 1;
    } else {
      textNode.style.opacity = 0;
    }
  }

  /**
   * Обновляет верхний текст
   * @param {String} text
   */
  updateTopText(text) {
    this.$textTop.innerText = text;
  }

  /**
   * Обновляет нижний текст
   * @param {String} text
   */
  updateBottomText(text) {
    this.$textBottom.innerText = text;
  }

  /**
   * Обработчик события для поля создания верхнего текста
   */
  topTextChanged = () => {
    if (this.$topTextInput.value.length <= this.maxTextLength) {
      this.notifyTopTextChanged(this.$topTextInput.value);
      this.setTextVisibility(this.$topTextInput, this.$textTop);
    } else {
      this.$topTextInput.value = this.$topTextInput.value.slice(0, this.maxTextLength);
    }
  };

  /**
   * Обработчик события для поля создания нижнего текста
   */
  bottomTextChanged = () => {
    if (this.$bottomTextInput.value.length <= this.maxTextLength) {
      this.notifyBottomTextChanged(this.$bottomTextInput.value);
      this.setTextVisibility(this.$bottomTextInput, this.$textBottom);
    } else {
      this.$bottomTextInput.value = this.$bottomTextInput.value.slice(0, this.maxTextLength);
    }
  };

  /**
   * Обработчик клика по Body
   * @param {Event} event
   */
  bodyClickHandler = (event) => {
    if (this.isListOpen && !this.$dropdown.contains(event.target)) {
      this.hideList();
    }
  };

  /**
   * Очищяет текстовые поля
   */
  clearInputs() {
    this.$topTextInput.value = '';
    this.$bottomTextInput.value = '';
  }
}
