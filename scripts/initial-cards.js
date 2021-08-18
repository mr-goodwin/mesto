const initialCards = [
  {
    name: 'Домик у пруда',
    link: 'https://www.tetrad.ru/wp-content/uploads/2019/01/31390-selskij-almaz-vyshivka-pejzazh-diy-5d-almaznyj-zhivopis-craft-home-decor-vysokokachestvennye-vyshivka-s-kristallami.jpg'
  },
  {
    name: 'Венеция',
    link: 'https://cdn1.ozone.ru/s3/multimedia-v/6007169935.jpg'
  },
  {
    name: 'Лебединая верность',
    link: 'https://images.ua.prom.st/2642407985_w640_h640_almaznaya-vyshivka-mozaika.jpg'
  },
  {
    name: 'В ритме танца',
    link: 'https://raduga-shop.ru/wa-data/public/shop/products/07/76/17607/images/25911/25911.750x0.jpg'
  },
  {
    name: 'Такое разное море',
    link: 'https://c.wallhere.com/photos/5b/9d/sea_beach_art_painting_craft_sun_rays_evening-1068095.jpg!d'
  },
  {
    name: 'Закат - Леонид Афремов',
    link: 'https://cdn1.ozone.ru/s3/multimedia-o/c1200/6016695060.jpg'
  },
  {
    name: 'Домик у пруда',
    link: 'https://www.tetrad.ru/wp-content/uploads/2019/01/31390-selskij-almaz-vyshivka-pejzazh-diy-5d-almaznyj-zhivopis-craft-home-decor-vysokokachestvennye-vyshivka-s-kristallami.jpg'
  },
  {
    name: 'Венеция',
    link: 'https://cdn1.ozone.ru/s3/multimedia-v/6007169935.jpg'
  },
  {
    name: 'Лебединая верность',
    link: 'https://images.ua.prom.st/2642407985_w640_h640_almaznaya-vyshivka-mozaika.jpg'
  }
];

const configValadate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_add_invalid',
  inputErrorClass: '.popup__error',
  errorClass: 'popup__error_active',
  inputInvalidClass: 'popup__input_invalid',
  popupInputSectionSelector: '.popup-input-section'
}

const configEditProfile = {
  popupEdit: document.querySelector('.popup_type_edit'),// первый попап (редактирования профиля)
  inputInPopupProfileName: document.querySelector('.popup__input_type_profile-name'),// переменная формы ввода имени в первом попапе (редактирования данных профиля)
  popupFormEditProfile: document.querySelector('.popup__form_type_profile'),// переменная формы редактирования данных профиля в первом попапе
  inputInPopupProfileDescription: document.querySelector('.popup__input_type_profile-description'),// переменная формы ввода описания в первом попапе (редактирования данных профиля)
  buttonClosePopupEdit: document.querySelector('.popup__close_edit'),//кнопка закрытия первого попапа (редактирования данных профиля)
  titleProfileOnMainPage: document.querySelector('.profile__title'),// имя профиля, отображаемое на главной странице
  buttonEditProfileOnMainPage: document.querySelector('.profile__edit'),// кнопка редактирования данных профиля, расположенная на главной странице
  subtitleProfileOnMainPage: document.querySelector('.profile__subtitle'),// описание под профилем, отображаемое на главной странице
}

const configAddCard = {
  buttonAddOnMainPage: document.querySelector('.profile__add-button'),// кнопка открытия попапа добавления новой карточки (на главной странице)
  popupAdd: document.querySelector('.popup_type_add'),// второй попап (добавления карточки)
  buttonClosePopupAdd: document.querySelector('.popup__close_add'),//кнопка закрытия второго попапа (добавления карточки)
  popupFormAdd: document.querySelector('.popup__form_type_add'),// форма добавления новой карточки.
  cardNameInput: document.querySelector('.popup__input_type_name'),// инпуты с данными этой формы (1/2)
  cardLinkInput: document.querySelector('.popup__input_type_url'),// инпуты с данными этой формы (2/2)
  buttonSaveAddNewCard: document.querySelector('.popup__save_add'),// кнопка сохранения в попапе при добавлении новой карточки
  elementsContainer: document.querySelector('.elements'),// переменная блока с карточками (куда будем вставлять готовые)
  // cardTemplate: document.querySelector('#template-card').content,// переменная содержимого тэга template
  // cardElementTemplate: cardTemplate.querySelector('.card'),// разметка дефолтной карточки в теплите
}

const configFullPicture = {
  popupImg: document.querySelector('.popup_type_picture'),// третий попап (увеличенного просмотра фото)
  buttonClosePopupPicture: document.querySelector('.popup__close_picture'),// кнопка закрытия третьего попапа (увеличенного просмотра фото)
  imgInPopup: document.querySelector('.popup_type_picture').querySelector('.popup__picture-img'),// третий попап (увеличенный просмотр изображения карточки)
  descriptionInPopup: document.querySelector('.popup_type_picture').querySelector('.popup__picture-description'),// описание (подпись) третьего попапа (увеличенного просмотра изображения карточки)
}

export {initialCards, configValadate, configEditProfile, configAddCard, configFullPicture}