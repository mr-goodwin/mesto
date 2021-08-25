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
    this.configValadate = configValadate;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // отобразить инпут ERORR
  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.closest(this._popupInputSectionSelector).querySelector(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputInvalidClass);
  }

  // скрыть инпут ERORR
  _hideInputError(inputElement) {
    const formSectionElement = inputElement.closest(this._popupInputSectionSelector);
    const errorElement = formSectionElement.querySelector(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputInvalidClass);
  }

  // проверка поля на валидность (точнее не валидность)
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  resetValidation() {
    this.toggleButtonState(); // управляем кнопкой
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement) // очищаем ошибки
    });
  }

  // переключатель состояния кнопки в зависимости от состояния валидности полей формы
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  // установка слушателей событий для валидации
  _setEventListeners() {
    this.toggleButtonState();
    const handleFormSubmit = (evt) => evt.preventDefault(); // стандартное навешивание слушателя нажатия 'SUBMIT' (убираем стандартное поведение при нажатии)
    this._formElement.addEventListener('submit', handleFormSubmit);
    // const buttonElement = formElement.querySelector(configValadate.submitButtonSelector); // находим кнопку сохранения
    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      };
      inputElement.addEventListener('input', handleInput);
    };
    this._inputList.forEach(inputListIterator); // проходимся по каждому элементу и навешиваем на каждый из них слушатель 'input'
    this.toggleButtonState();
  }

  // инициируем валидацию навешиванием слушателей на указанный элемент формы
  enableValidation() {
      this._setEventListeners();
  }
}

export { FormValidator };
