function enableValidation() {
  const form = document.querySelector('.popup__inputs[name="popup-inputs"]')
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', handleFormInput);
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const isValid = form.checkValidity();

  if (isValid) {
    alert('Форма валидна!');
    form.reset();
  } else {
    alert('Форма не валидна!');
  }
}

function handleFormInput(evt) {
  const input = evt.target;
  const form = evt.currentTarget;

  // Step 1. Search invalid field & set value error
  setCustomError(input);

  // Step 2. Display texts errors for users
  setFieldError(input);

  // Step 3. Disabled or enabled button target
  setSubmitButtonState(form);
}

function setCustomError(input) {
  const validity = input.validity;

  input.setCustomValidity('');

  if (validity.tooShort || validity.tooLong) {
    const current = input.value.length;
    const min = input.getAttribute('minlength');
    const max = input.getAttribute('maxlength');
    input.setCustomValidity(`Строка имеет неверную длину. Введено ${current} символов, а должно быть от ${min} до ${max} !!!`);
  }

  if (validity.typeMismatch) {
    input.setCustomValidity('Это не ссылка!');
  }
}

function setFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form) {
  const button = form.querySelector('.popup__save');
  const isValid = form.checkValidity();

  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.add('popup__save_add_valid');
    button.classList.remove('popup__save_add_invalid');
  } else {
    button.setAttribute('disabled', 'true');
    button.classList.add('popup__save_add_invalid');
    button.classList.remove('popup__save_add_valid');
  }
}

enableValidation();
