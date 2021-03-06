import {
  initialCards,
  configValadate,
  configEditProfile,
  configAddCard,
  configFullPicture,
} from "./constant.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//-------------------------------------------------------------------------------------------
// ФУНКЦИИ
//-------------------------------------------------------------------------------------------

// функция обработки профиля редактирования
function handleEditProfile(evt) {
  evt.preventDefault();  
  configEditProfile.titleProfileOnMainPage.textContent =
    configEditProfile.inputInPopupProfileName.value;
  configEditProfile.subtitleProfileOnMainPage.textContent =
    configEditProfile.inputInPopupProfileDescription.value;
  closePopup(configEditProfile.popupEdit);
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

// добавление данных из карточки в третий попап (увеличенного просмотра изображения карточки)
function handlePreviewPicture(name, link) {
  configFullPicture.imgInPopup.src = link;
  configFullPicture.descriptionInPopup.textContent = name;
  configFullPicture.imgInPopup.alt = name;
  openPopup(configFullPicture.popupImg);
}

// добавление CARD в DOM после создания классов
initialCards.forEach((item) => {
  configAddCard.elementsContainer.append(createCard(item));
});

function createCard(cardDataParam) {
  const card = new Card(cardDataParam, "#template-card", handlePreviewPicture);
  const cardElement = card.createCard();
  return cardElement;
}

// функция создания новой карточки
function handleAddCard(evt) {
  evt.preventDefault();
  validationPopupAdd.resetValidation();
  const name = configAddCard.cardNameInput.value;
  const imageSrc = configAddCard.cardLinkInput.value;
  const cardData = {
    name: name,
    link: imageSrc,
  };
  configAddCard.elementsContainer.prepend(createCard(cardData)); // Добавляем в DOM (в начало элемента)
  configAddCard.popupFormAdd.reset();
  validationPopupAdd.resetValidation();
  closePopup(configAddCard.popupAdd);
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
  configEditProfile.inputInPopupProfileName.value =
    configEditProfile.titleProfileOnMainPage.textContent;
  configEditProfile.inputInPopupProfileDescription.value =
    configEditProfile.subtitleProfileOnMainPage.textContent;
  openPopup(configEditProfile.popupEdit);
  validationPopupEdit.resetValidation();
}

//-------------------------------------------------------------------------------------------
// СЛУШАТЕЛИ
//-------------------------------------------------------------------------------------------

configEditProfile.buttonEditProfileOnMainPage.addEventListener(
  "click", () => {
    editProfileData();
    validationPopupEdit.resetValidation();
  }
  
);

configEditProfile.buttonClosePopupEdit.addEventListener("click", () =>
  closePopup(configEditProfile.popupEdit)
);

configEditProfile.popupFormEditProfile.addEventListener(
  "submit",
  handleEditProfile
);

configAddCard.buttonAddOnMainPage.addEventListener("click", () => {
    openPopup(configAddCard.popupAdd);  
    validationPopupAdd.resetValidation();
  }  
);

configAddCard.buttonClosePopupAdd.addEventListener("click", () => {
  closePopup(configAddCard.popupAdd);
});

configAddCard.popupFormAdd.addEventListener("submit", handleAddCard);

configFullPicture.buttonClosePopupPicture.addEventListener("click", () =>
  closePopup(configFullPicture.popupImg)
);

//запуск классов валидации:
const validationPopupEdit = new FormValidator(
  configValadate,
  configEditProfile.popupFormEditProfile
);
const validationPopupAdd = new FormValidator(
  configValadate,
  configAddCard.popupFormAdd
);

validationPopupEdit.enableValidation();
validationPopupAdd.enableValidation();
validationPopupAdd.toggleButtonState();
