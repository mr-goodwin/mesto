const popupEdit = document.querySelector(".popup_type_edit"); // первый попап (редактирования профиля)
const inputInPopupProfileName = document.querySelector(".popup__input_type_profile-name"); // переменная формы ввода имени в первом попапе (редактирования данных профиля)
const inputInPopupProfileDescription = document.querySelector(".popup__input_type_profile-description"); // переменная формы ввода описания в первом попапе (редактирования данных профиля)
const buttonEditProfileOnMainPage = document.querySelector(".profile__edit"); // кнопка редактирования данных профиля, расположенная на главной странице
const buttonClosePopupEdit = document.querySelector(".popup__close_edit"); //кнопка закрытия первого попапа (редактирования данных профиля)
const titleProfileOnMainPage = document.querySelector(".profile__title"); // имя профиля, отображаемое на главной странице
const subtitleProfileOnMainPage = document.querySelector(".profile__subtitle"); // описание под профилем, отображаемое на главной странице
const popupFormEditProfile = document.querySelector(".popup__form_type_profile"); // переменная формы редактирования данных профиля в первом попапе
const buttonAddOnMainPage = document.querySelector(".profile__add-button"); // кнопка открытия попапа добавления новой карточки (на главной странице)
const popupAdd = document.querySelector(".popup_type_add"); // второй попап (добавления карточки)
const buttonClosePopupAdd = document.querySelector(".popup__close_add"); //кнопка закрытия второго попапа (добавления карточки)
const popupImg = document.querySelector(".popup_type_picture"); // третий попап (увеличенного просмотра фото)
const buttonClosePopupPicture = document.querySelector(".popup__close_picture"); // кнопка закрытия третьего попапа (увеличенного просмотра фото)
const cardTemplate = document.querySelector("#template-card").content; // переменная содержимого тэга template
const cardElementTemplate = cardTemplate.querySelector(".card"); // разметка дефолтной карточки в теплите
const elementsContainer = document.querySelector(".elements"); // переменная блока с карточками (куда будем вставлять готовые)
const popupFormAdd = document.querySelector(".popup__form_type_add"); // форма добавления новой карточки.
const cardNameInput = document.querySelector(".popup__input_type_name"); // инпуты с данными этой формы (1/2)
const cardLinkInput = document.querySelector(".popup__input_type_url"); // инпуты с данными этой формы (2/2)
const imgInPopup = popupImg.querySelector(".popup__picture-img"); // третий попап (увеличенный просмотр изображения карточки)
const descriptionInPopup = popupImg.querySelector(".popup__picture-description"); // описание (подпись) третьего попапа (увеличенного просмотра изображения карточки)
const buttonSaveAddNewCard = document.querySelector(".popup__save_add"); // кнопка сохранения в попапе при добавлении новой карточки

// функция обработки профиля редактирования
function handleEditProfile(evt) {
  evt.preventDefault();
  titleProfileOnMainPage.textContent = inputInPopupProfileName.value;
  subtitleProfileOnMainPage.textContent = inputInPopupProfileDescription.value;
  closePopup(popupEdit);
}

// универсальная функция открытия попапа (с назначением слушателей на документ)
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupKeyEsc);
  document.addEventListener("click", closePopupOverlay);
}

// универсальная функция закрытия попапа (с удалением слушателей с документа)
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupKeyEsc);
  document.removeEventListener("click", closePopupOverlay);
}

//функция, которая создаёт DOM-элемент с карточкой и возвращает его.
function createCard(cardData) {
  const cardElement = cardElementTemplate.cloneNode(true);
  const trashedButton = cardElement.querySelector(".card__in-trash");
  const likeButton = cardElement.querySelector(".card__like");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  trashedButton.addEventListener("click", handleDeleteCard);
  likeButton.addEventListener("click", handleLikeIcon);
  cardImage.addEventListener("click", () => handlePreviewPicture(cardData));
  return cardElement;
}

// добавление данных из карточки в третий попап (увеличенного просмотра изображения карточки)
function handlePreviewPicture(cardData) {
  imgInPopup.src = cardData.link;
  descriptionInPopup.textContent = cardData.name;
  imgInPopup.alt = cardData.name;
  openPopup(popupImg);
}

// создание карточек "из коробки"
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  elementsContainer.append(cardElement);
});

// универсальная функция удаления карточки
function handleDeleteCard(evt) {
  const currentCard = evt.target.closest(".card");
  currentCard.remove();
}

// универсальная функция переключения состояния кнопки ЛАЙК
function handleLikeIcon(evt) {
  evt.target.classList.toggle("card__like_activ");
}

// функция создания новой карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const imageSrc = cardLinkInput.value;
  const cardData = {
    name: name,
    link: imageSrc,
  };
  const cardElement = createCard(cardData);
  elementsContainer.prepend(cardElement);
  popupFormAdd.reset();
  buttonSaveAddNewCard.setAttribute("disabled", true);
  closePopup(popupAdd);
}

// функция закрытия попап по нажатию кнопки Escape
function closePopupKeyEsc(evt) {
  if (evt.key === "Escape") {
    const popupEsc = document.querySelector(".popup_opened");
    closePopup(popupEsc);
  }
}

// функция закрытия попап по нажатию на оверлей
function closePopupOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

// функция заполнения формы редактирования попапа текущими данными с главной страницы с последующим открытием первого попапа (редактирования данных профиля)
function editProfileData() {
  inputInPopupProfileName.value = titleProfileOnMainPage.textContent;
  inputInPopupProfileDescription.value = subtitleProfileOnMainPage.textContent;
  openPopup(popupEdit);
}

//-------------------------------------------------------------------------------------------
// СЛУШАТЕЛИ
//-------------------------------------------------------------------------------------------

buttonEditProfileOnMainPage.addEventListener("click", editProfileData);

buttonClosePopupEdit.addEventListener("click", () => closePopup(popupEdit));

popupFormEditProfile.addEventListener("submit", handleEditProfile);

buttonAddOnMainPage.addEventListener("click", () => openPopup(popupAdd));

buttonClosePopupAdd.addEventListener("click", () => closePopup(popupAdd));

popupFormAdd.addEventListener("submit", handleAddCard);

buttonClosePopupPicture.addEventListener("click", () => closePopup(popupImg));
