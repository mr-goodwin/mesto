class Card {
  _name;
  _link;
  _cardTemplate;

  constructor(data, cardSelector, handlePreviewPicture) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = document.querySelector(cardSelector); ///
    this._handlePreviewPicture = handlePreviewPicture;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector('.card__in-trash')
      .addEventListener('click', () => this._handleDeleteCard());
    this._cardElement
      .querySelector('.card__like')
      .addEventListener('click', () => this._handleLikeIcon());
    this._cardElement.querySelector('.photo-card__image').addEventListener('click', () => this._handlePreviewPicture(this._name, this._link));
  }

  createCard = () => {
    this._cardElement = this._getTemplate();
    //this._setEventListeners(); /// при запуске перестают рендерится карточки!!!???
    this._trashedButton = this._cardElement.querySelector('.card__in-trash');
    this._likeButton = this._cardElement.querySelector('.card__like');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.card__title').textContent = this._name;

    return this._cardElement;
  };

  // универсальная функция переключения состояния кнопки ЛАЙК
  _handleLikeIcon() {
    this._likeButton.classList.toggle('card__like_activ');
  }

  // универсальная функция удаления карточки
  _handleDeleteCard() {
    this._cardElement.remove();
  }
}

export { Card };
