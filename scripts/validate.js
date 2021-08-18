

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_add_invalid',
  inputErrorClass: '.popup__error',
  errorClass: 'popup__error_active',
  inputInvalidClass: 'popup__input_invalid',
  popupInputSectionSelector: '.popup-input-section'
}

// отобразить инпут ERORR
const showInputError = (inputElement, errorMessage, config) => {
  const formSectionElement = inputElement.closest(config.popupInputSectionSelector);
  const errorElement = formSectionElement.querySelector(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  inputElement.classList.add(config.inputInvalidClass);
};

// скрыть инпут ERORR
const hideInputError = (inputElement, config) => {
  const formSectionElement = inputElement.closest(config.popupInputSectionSelector);
  const errorElement = formSectionElement.querySelector(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputInvalidClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(inputElement, errorMessage, config);
  } else {
    hideInputError(inputElement, config);
  }
};

// переключатель состояния кнопки в зависимости от состояния валидности полей формы
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  const findAtLeastOneInvalid = (inputElement) => !inputElement.validity.valid;
  const hasInvalidInput = inputList.some(findAtLeastOneInvalid);
  if (hasInvalidInput) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// установка слушателей событий для валидации
const setEventListeners = (formElement, config) => {
  const handleFormSubmit = (evt) => evt.preventDefault(); // стандартное навешивание слушателя нажатия 'SUBMIT' (убираем стандартное поведение при нажатии)
  formElement.addEventListener('submit', handleFormSubmit);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); // находим внутри формы все инпуты и делаем из них массив
  const buttonElement = formElement.querySelector(config.submitButtonSelector); // находим кнопку сохранения
  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement);
    };
    inputElement.addEventListener('input', handleInput);
  };
  inputList.forEach(inputListIterator); // проходимся по каждому элементу и навешиваем на каждый из них слушатель 'input'
  toggleButtonState(inputList, buttonElement);
};

// находим все формы, превращаем их в массив, после чего перебираем его и убиваем дефолтное поведение при нажатии (отправке)
const enableValidation = (config) => {
  const formElements = document.querySelectorAll(config.formSelector);
  const formList = Array.from(formElements);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(config);
