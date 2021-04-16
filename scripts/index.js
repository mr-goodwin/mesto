//-------------------------------------------------------------------------------------------
// ПЕРЕМЕННЫЕ
//-------------------------------------------------------------------------------------------

const popupEdit = document.querySelector('.popup_type_edit'); // переменная для кнопки открытия попап редактирования профиля (на главной странице)
const profTitle = document.querySelector('.popup__input_type_proftitle');
const profSubtitle = document.querySelector('.popup__input_type_profsubtitle');
const profileEdit = document.querySelector('.profile__edit');
const popupClose = document.querySelector('.popup__close_edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupInputsProfile = document.querySelector('.popup__inputs_type_profile');
const addButton = document.querySelector('.profile__add-button'); // переменная для кнопки открытия попап добавления новой карточки (на главной странице)
const popupAdd = document.querySelector('.popup_type_add'); // второй попап (добавления карточки)
const closeAddPopup = document.querySelector('.popup__close_add'); //кнопка закрытия второго попапа (добавления карточки)
const popupImg = document.querySelector('.popup_type_picture'); // третий попап (увеличенного просмотра фото)
const closePicturePopup = document.querySelector('.popup__close_picture'); // кнопка закрытия третьего попапа (увеличенного просмотра фото)
const cardTemplate = document.querySelector('#template-card').content; // переменная содержимого тэга template
const cardElementTemplate = cardTemplate.querySelector('.card'); // разметка дефолтной карточки в теплите
const elementsContainer = document.querySelector('.elements'); // переменная блока с карточками (куда будем вставлять готовые)
const popupInputsAdd = document.querySelector('.popup__inputs_type_add'); // Форма добавления новой карточки.
const nameNewCard = document.querySelector('.popup__input_type_name'); // Инпуты с данными этой формы (1/2)
const linkNewCard = document.querySelector('.popup__input_type_url');// Инпуты с данными этой формы (2/2)

//-------------------------------------------------------------------------------------------
// ФУНКЦИИ
//-------------------------------------------------------------------------------------------

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = profTitle.value;
  profileSubtitle.textContent = profSubtitle.value;
  closePopup(popupEdit);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//функция, которая создаёт DOM-элемент с карточкой и возращает его.
function createCard(cardData) {
  const cardElement = cardElementTemplate.cloneNode(true);
  const trashedButton = cardElement.querySelector('.card__in-trash');
  const likeButton = cardElement.querySelector('.card__like');
  const imgButton = cardElement.querySelector('.card__image');
  const imgInPopup = popupImg.querySelector('.popup__picture-img');
  const descriptionInPopup = popupImg.querySelector('.popup__picture-description');
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  trashedButton.addEventListener('click', handleDeleteCard);
  likeButton.addEventListener('click', cardLike);
  imgButton.addEventListener('click', () => {
    imgInPopup.src = cardData.link;
    descriptionInPopup.textContent = cardData.name;
    imgInPopup.alt = cardData.name;
    openPopup(popupImg);
  });
  return cardElement
}

// создание карточек "из коробки"
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  elementsContainer.append(cardElement);
})

function handleDeleteCard(evt) {
  const currentCard = evt.target.closest('.card');
  currentCard.remove();
}

function cardLike(evt) {
  evt.target.classList.toggle('card__like_activ');
}

function formAddingCard(evt) {
  evt.preventDefault();
  const name = nameNewCard.value;
  const imageSrc = linkNewCard.value;
  const cardData = {
    name: name,
    link: imageSrc
  }
  const cardElement = createCard(cardData);
  elementsContainer.prepend(cardElement);
  popupInputsAdd.reset();
  closePopup(popupAdd);
}

//-------------------------------------------------------------------------------------------
// СЛУШАТЕЛИ
//-------------------------------------------------------------------------------------------

profileEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  profTitle.value = profileTitle.textContent;
  profSubtitle.value = profileSubtitle.textContent;
});

popupClose.addEventListener('click', function () {
  closePopup(popupEdit);
});

popupInputsProfile.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

closeAddPopup.addEventListener('click', function () {
  closePopup(popupAdd);
});

popupInputsAdd.addEventListener('submit', formAddingCard);

closePicturePopup.addEventListener('click', function () {
  closePopup(popupImg);
});
