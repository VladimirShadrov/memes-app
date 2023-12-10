export class View {
  constructor({ getSelectedMemData }) {
    this.selectedMemData = getSelectedMemData;
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

    this.addListeners();
  }
  addListeners() {
    this.$list.addEventListener('click', this.selectMem);
    this.$dropdownHead.addEventListener('click', this.showLIst);
    document.addEventListener('click', this.bodyClickHandler);
  }

  selectMem = (event) => {
    if (event.target.closest('[data-type="option"]')) {
      this.$dropdownHeadText.innerText = event.target.innerText;
      this.selectedMemData(event.target.dataset.id);
      this.hideList();
    }
  };

  showLIst = () => {
    this.$listWrapper.classList.add(this.$listWrapper.dataset.activeClass);
    setTimeout(() => (this.isListOpen = true), 0);
  };

  hideList() {
    this.$listWrapper.classList.remove(this.$listWrapper.dataset.activeClass);
    this.isListOpen = false;
  }

  getOption(text, id) {
    const option = document.createElement('li');
    option.classList.add('setup__list-item');
    option.innerText = text;
    option.dataset.id = id;
    option.dataset.type = 'option';
    return option;
  }

  renderList(list) {
    list.forEach((option) => {
      const { name, id } = option;
      this.$list.append(this.getOption(name, id));
    });
  }

  setSelectedMem(memData) {
    const { url, textTop, textBottom } = memData;
    this.$memImage.src = url;
    this.$textTop.innerText = textTop;
    this.$textBottom.innerText = textBottom;
    this.$topTextInput.value = textTop;
    this.$bottomTextInput.value = textBottom;
  }

  updateTopText(memData) {
    const textTop = memData;
  }

  bodyClickHandler = (event) => {
    if (this.isListOpen && !this.$dropdown.contains(event.target)) {
      this.hideList();
    }
  };
}
