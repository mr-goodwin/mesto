import {initialCards, configValadate, configEditProfile, configAddCard, configFullPicture} from './initial-cards.js';

class FormValidator {
    constructor(configValadate, formElement) {
        this._formSelector = configValadate.formSelector;
        this._inputSelector = configValadate.inputSelector;
        this._submitButtonSelector = configValadate.submitButtonSelector;
        this._inactiveButtonClass = configValadate.inactiveButtonClass;
        this._inputErrorClass = configValadate.inputErrorClass;
        this._errorClass = configValadate.errorClass;
        this._inputInvalidClass = configValadate.inputInvalidClass;
        this._popupInputSectionSelector = configValadate.popupInputSectionSelector;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }
      
  // отобразить инпут ERORR (НЕ РАБОТАЕТ)
  _showInputError(inputElement, errorMessage, configValadate) {
    const errorElement = this._inputElement.closest(configValadate.popupInputSectionSelector).querySelector(configValadate.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configValadate.errorClass);
    inputElement.classList.add(configValadate.inputInvalidClass);
  };
  
  // скрыть инпут ERORR (НЕ РАБОТАЕТ)
  _hideInputError(inputElement, configValadate) {
    const formSectionElement = inputElement.closest(configValadate.popupInputSectionSelector);
    const errorElement = formSectionElement.querySelector(configValadate.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(configValadate.errorClass);
    inputElement.classList.remove(configValadate.inputInvalidClass);
  };
  
  // проверка поля на валидность (точнее не валидность)
  _checkInputValidity(inputElement, configValadate) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage, configValadate);
    } else {
      this._hideInputError(inputElement, configValadate);
    }
  };
  
  _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
  }

  // переключатель состояния кнопки в зависимости от состояния валидности полей формы
  toggleButtonState() {
    if (_hasInvalidInput()) {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
        this._buttonElement.removeAttribute('disabled');
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };
  
  // установка слушателей событий для валидации
  _setEventListeners() {
    this.toggleButtonState();

    const handleFormSubmit = (evt) => evt.preventDefault(); // стандартное навешивание слушателя нажатия 'SUBMIT' (убираем стандартное поведение при нажатии)
    formElement.addEventListener('submit', handleFormSubmit);
    // const buttonElement = formElement.querySelector(configValadate.submitButtonSelector); // находим кнопку сохранения
    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        checkInputValidity(formElement, inputElement, configValadate);
        this.toggleButtonState();
      };
      inputElement.addEventListener('input', handleInput);
    };
    inputList.forEach(inputListIterator); // проходимся по каждому элементу и навешиваем на каждый из них слушатель 'input'
    this.toggleButtonState();
  };
  
  // находим все формы, превращаем их в массив, после чего перебираем его и убиваем дефолтное поведение при нажатии (отправке)
  enableValidation(configValadate) {
    const formElements = document.querySelectorAll(configValadate.formSelector);
    const formList = Array.from(formElements);
    formList.forEach((formElement) => {
      this._setEventListeners(formElement, configValadate);
    });
    this.enableValidation();
  };

  
     
}

export {FormValidator}