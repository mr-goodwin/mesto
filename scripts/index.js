let popup = document.querySelector('.popup');
let profTitle = document.querySelector('.popup__input_type_proftitle');
let profSubtitle = document.querySelector('.popup__input_type_profsubtitle');
let profileEdit = document.querySelector('.profile__edit');
let popupClose = document.querySelector('.popup__close');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupProTitle = document.querySelector('[name="popup__proftitle"]');
let popupProSubtitle = document.querySelector('[name="popup__profsubtitle"]');
let popupContent = document.querySelector('.popup__content');

//по клику на ЭДИТ надо открыть попап (дописать класс) //функция открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');
  popupProTitle.value =  profileTitle.textContent;
  popupProSubtitle.value = profileSubtitle.textContent;
}

//по клику на КРЕСТИК надо закрыть попап (снять класс) //функция закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupProTitle.value;
  profileSubtitle.textContent = popupProSubtitle.value;
  closePopup()
};

//устанавливаем наблюдатель кнопке EDIT
profileEdit.addEventListener('click', function(e) {
  openPopup();
});

//наблюдаем за кнопкой закрытия (крестик)
popupClose.addEventListener('click', function(e) {
  closePopup();
});

//сохраняем через formSubmitHandler при нажатии "Сохранить"
popupContent.addEventListener('submit', formSubmitHandler);
