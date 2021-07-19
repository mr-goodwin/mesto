// отобразить инпут ERORR
const showInputError = (inputElement, errorMessage) => {
  //console.log(inputElement.name, errorMessage);
  const formSectionElement = inputElement.closest(".popup-input-section");
  const errorElement = formSectionElement.querySelector(".popup__error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_active");
};

// скрыть инпут ERORR
const hideInputError = (inputElement) => {
  const formSectionElement = inputElement.closest(".popup-input-section");
  const errorElement = formSectionElement.querySelector(".popup__error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_active");
};

const checkInputValidity = (formElement, inputElement, inputSelector) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(inputElement, errorMessage);
    inputElement.classList.add("popup__input_invalid");
  } else {
    hideInputError(inputElement);
    inputElement.classList.remove("popup__input_invalid");
  }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  const findAtLeastOneInvalid = (inputElement) => !inputElement.validity.valid;
  const hasInvalidInput = inputList.some(findAtLeastOneInvalid);
  if (hasInvalidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// установка слушателей событий для валидации
const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector
) => {
  // стандартное навешивание слушателя нажатия 'SUBMIT' (убираем стандартное поведение при нажатии)
  const handleFormSubmit = (evt) => evt.preventDefault();
  formElement.addEventListener("submit", handleFormSubmit);
  // находим внутри формы все инпуты и делаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // находим кнопку сохранения
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
      //console.log(evt.target.name);
    };
    inputElement.addEventListener("input", handleInput);
  };

  // проходимся по каждому элементу и навешиваем на каждый из них слушатель 'input'
  inputList.forEach(inputListIterator);
  toggleButtonState(inputList, buttonElement);
};

// находим все формы, превращаем их в массив, после чего перебираем его и убиваем дефолтное поведение при нажатии (отправке)
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
}) => {
  const formElements = document.querySelectorAll(formSelector);
  const formList = Array.from(formElements);
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_add_invalid",
  //inputErrorClass: 'popup__error',
  //errorClass: 'popup__error_visible'
});
