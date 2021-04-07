//-------------------------------------------------------------------------------------------
// ПЕРЕМЕННЫЕ
//-------------------------------------------------------------------------------------------

const popupEdit = document.querySelector('.popup__edit'); // переменная для кнопки открытия попап редактирования профиля (на главной странице)
  const profTitle = document.querySelector('.popup__input_type_proftitle');
  const profSubtitle = document.querySelector('.popup__input_type_profsubtitle');
const profileEdit = document.querySelector('.profile__edit');
const popupClose = document.querySelector('.popup__close_edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupInputsProfile = document.querySelector('.popup__inputs_profile');

const popupInputsAdd = document.querySelector('.popup__inputs_add');

const addButton = document.querySelector('.profile__add-button'); // переменная для кнопки открытия попап добавления новой карточки (на главной странице)
const popupAdd = document.querySelector('.popup__add'); // второй попап (добавления карточки)
  const closeAddPopup = document.querySelector('.popup__close_add');
  const addCardButton = document.querySelector('.popup__save_add');
  const nameNewCard = document.querySelector('.popup__input_type_name');
  const linkNewCard = document.querySelector('.popup__input_type_url');


  const popupImg = document.querySelector('.popup__picture'); // третий попап (увеличенного просмотра фото)
  const closePicturePopup = document.querySelector('.popup__close_picture'); // кнопка закрытия третьего попапа

const cardTemplate = document.querySelector('#template-card').content; // переменная содержимого тэга template
const elementsContainer = document.querySelector('.elements'); // переменная блока с карточками

const initialCards = [
  { name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'  },

  { name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'  },

  { name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'  },

  { name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'  },

  { name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'  },

  { name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'  }
  ];

//-------------------------------------------------------------------------------------------
// ФУНКЦИИ
//-------------------------------------------------------------------------------------------

function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  profTitle.value = profileTitle.textContent;
  profSubtitle.value = profileSubtitle.textContent;
}

function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = profTitle.value;
  profileSubtitle.textContent = profSubtitle.value;
  closePopupEdit()
};

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
  nameNewCard.value = '';
  linkNewCard.value = '';
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}

initialCards.forEach(function (before) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const trashedButton = cardElement.querySelector('.card__in-trash');
  const likeButton = cardElement.querySelector('.card__like');
  const imgButton = cardElement.querySelector('.card__image');
  const izobrajenieVpopap = popupImg.querySelector('.popup__picture-img');
  const nadpisVpopap = popupImg.querySelector('.popup__picture-description');

  cardElement.querySelector('.card__image').src = before.link;
  cardElement.querySelector('.card__image').alt = before.name;
  cardElement.querySelector('.card__title').textContent = before.name;
  trashedButton.addEventListener('click', CardInTrash);
  likeButton.addEventListener('click', cardLike);
  imgButton.addEventListener('click', () => {
    izobrajenieVpopap.src = before.link;
    nadpisVpopap.textContent = before.name;
    openPopupImg();
  });
  elementsContainer.append(cardElement);
});

function CardInTrash(evt) {
  const currentCard = evt.target.closest('.card');
  currentCard.remove();
};

function cardLike(evt) {
  const currentCard = evt.target.closest('.card');
  const currentLike = currentCard.querySelector('.card__like');
  currentLike.classList.toggle('card__like_activ');
};

function openPopupImg() {
  popupImg.classList.add('popup_opened');
}

function closePopupImg() {
  popupImg.classList.remove('popup_opened');
}

function formAddingCard (evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const trashedButton = cardElement.querySelector('.card__in-trash');
  const likeButton = cardElement.querySelector('.card__like');
  const imgButton = cardElement.querySelector('.card__image');
  const izobrajenieVpopap = popupImg.querySelector('.popup__picture-img');
  const nadpisVpopap = popupImg.querySelector('.popup__picture-description');

  cardElement.querySelector('.card__image').src = linkNewCard.value;
  cardElement.querySelector('.card__image').alt = nameNewCard.value;
  cardElement.querySelector('.card__title').textContent = nameNewCard.value;
  trashedButton.addEventListener('click', CardInTrash);
  likeButton.addEventListener('click', cardLike);
  imgButton.addEventListener('click', () => {
    izobrajenieVpopap.src = linkNewCard.value;
    nadpisVpopap.textContent = nameNewCard.value;
    openPopupImg();
  });
  elementsContainer.prepend(cardElement);
  closePopupAdd();
}

//-------------------------------------------------------------------------------------------
// СЛУШАТЕЛИ
//-------------------------------------------------------------------------------------------

profileEdit.addEventListener('click', openPopupEdit);
popupClose.addEventListener('click', closePopupEdit);
popupInputsProfile.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', openPopupAdd);
closeAddPopup.addEventListener('click', closePopupAdd);

closePicturePopup.addEventListener('click', closePopupImg);

popupInputsAdd.addEventListener('submit', formAddingCard);
