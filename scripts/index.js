import {
  initialCards,
  configValadate,
  configEditProfile,
  configAddCard,
  configFullPicture,
} from "./initial-cards.js";
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

// рендер CARD после создания классов
initialCards.forEach((item) => { /// переберём массив по одному элементу
  // Создадим экземпляр карточки
  const card = new Card(item, "#template-card", handlePreviewPicture); /// в каждый экземпляр карточки передадим аргументы из текущего элемента массива
  const cardElement = card.createCard(); /// применим к полученному конструктору функцию создания карточки с выводом результата наружу
  // Добавляем в DOM (в конец элемента)
  configAddCard.elementsContainer.append(cardElement);
});

// функция создания новой карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const name = configAddCard.cardNameInput.value;
  const imageSrc = configAddCard.cardLinkInput.value;
  const cardData = {
    name: name,
    link: imageSrc,
  };
  const card = new Card(cardData, "#template-card", handlePreviewPicture);
  const cardElement = card.createCard();
  configAddCard.elementsContainer.prepend(cardElement); // Добавляем в DOM (в начало элемента)
  configAddCard.popupFormAdd.reset();
  configAddCard.buttonSaveAddNewCard.setAttribute("disabled", true);
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
}

//-------------------------------------------------------------------------------------------
// СЛУШАТЕЛИ
//-------------------------------------------------------------------------------------------

configEditProfile.buttonEditProfileOnMainPage.addEventListener(
  "click",
  editProfileData
);

configEditProfile.buttonClosePopupEdit.addEventListener("click", () =>
  closePopup(configEditProfile.popupEdit)
);

configEditProfile.popupFormEditProfile.addEventListener(
  "submit",
  handleEditProfile
);

configAddCard.buttonAddOnMainPage.addEventListener("click", () =>
  openPopup(configAddCard.popupAdd)
);

configAddCard.buttonClosePopupAdd.addEventListener("click", () =>
  closePopup(configAddCard.popupAdd)
);

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
