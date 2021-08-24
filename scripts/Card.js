class Card {
  constructor(data, cardSelector, openFullPicture) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = document.querySelector(cardSelector);
    this._openFullPicture = openFullPicture; // функция, переданная из INDEX.JS, открывающая полноразмернкю картинку при клике на картинку карточки
  }

  // приватная функция (метод) возвращающая разметку карточки из темплит (пустую)
  _getTemplate() {
    const cardElement = this._cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  // функция, создающая элемент карточки со слушателями и данными
  createCard = () => {
    this._cardElement = this._getTemplate();
    this._setEventListeners(this._cardElement); /// при запуске перестают рендерится карточки!!!???
    this._trashedButton = this._cardElement.querySelector(".card__in-trash");
    this._likeButton = this._cardElement.querySelector(".card__like");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    return this._cardElement;
  };

  // функция, навешивающая слушатели событий на определенные элементы новых экземпляров карточек
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__in-trash")
      .addEventListener("click", () => this._handleDeleteCard());

    this._cardElement
      .querySelector(".card__like")
      .addEventListener("click", () => this._handleLikeIcon());

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._openFullPicture(this._name, this._link)
      );
  }

  // универсальная функция переключения состояния кнопки ЛАЙК
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like_activ");
  }

  // универсальная функция удаления карточки
  _handleDeleteCard() {
    this._cardElement.remove();
  }
}

export { Card };
