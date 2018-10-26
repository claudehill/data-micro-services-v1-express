// import {  } from "./darkroast";
const selectCount = document.getElementById('select-guid-count');
const selectFormat = document.getElementById('select-guid-format');
const selectFormatOutput = document.getElementById('select-guid-output-format');
const selectStrength = document.getElementById('select-guid-strength');
const selectCountOptionSelected = selectCount.options[selectCount.selectedIndex];
const token = localStorage.getItem('token');
const mode = localStorage.getItem('userMode');
const btnSubmit = document.getElementById('submit-page-data');
const selectCountError = document.getElementById('invalid-select-guid-count');
const selectFormatError = document.getElementById('invalid-select-guid-format');
const selectFormatOutputError = document.getElementById('invalid-select-guid-output-format');
const selectStrengthError = document.getElementById('invalid-select-guid-strength');
const msgRequired = '<i class="fas fa-exclamation-triangle"></i>  This is a required field.';
const msgCaptchaError = '<i class="fas fa-exclamation-triangle"></i>  Recaptcha error: ';
const msgCaptchaSuccess = '<i class="far fa-check-circle"></i>  Recaptcha status: ';
const gRecaptchaElement = document.getElementById('g-recaptcha');

let selectCountValue;
let selectFormatValue;
let selectFormatOutputValue;
let selectStrengthValue;
let isRecaptchaValid = false;
let isErrorState = false;

if (selectCount) {
  var selectCountOptions = selectCount.getElementsByTagName('option');
}

$(document).ready(() => {
  if (mode === 'UNRESTRICTED') {
    setMaxCountUnrestricted();
  } else {
    setMaxCountRestricted();
  }

  selectCount.addEventListener('change', () => { resetErrorState(); });
  selectFormat.addEventListener('change', () => { resetErrorState(); });
  selectFormatOutput.addEventListener('change', () => { resetErrorState(); });
  selectStrength.addEventListener('change', () => { resetErrorState(); });

  btnSubmit.addEventListener('click', (e) => {
    validateOptions(e);
  });
});

function resetErrorState() {
  selectCount.classList.remove('is-invalid');
  selectFormat.classList.remove('is-invalid');
  selectFormatOutput.classList.remove('is-invalid');
  selectStrength.classList.remove('is-invalid');
}

function setMaxCountRestricted() {
  if (selectCount) {
    selectCountOptions[2].disabled = selectCountOptions[3].disabled = true;
    selectCount.value = 'select-count';
  }
}

function setMaxCountUnrestricted() {
  if (selectCount) {
    selectCountOptions[2].disabled = selectCountOptions[3].disabled = false;
    selectCount.value = 'select-count';
  }
}

function validateOptions(e) {

  if (selectCount.value === 'select-count') {
    selectCount.classList.add('is-invalid')
    selectCountError.innerHTML = msgRequired;
    e.preventDefault();
  } else {
    selectCountValue = selectCount.value;
    selectCount.classList.add('is-valid');
    (e) => { return true; }
  }

  if (selectFormat.value === 'select-format') {
    selectFormat.classList.add('is-invalid');
    selectFormatError.innerHTML = msgRequired;
    e.preventDefault();
  } else {
    selectFormatValue = selectFormat.value;
    selectFormat.classList.add('is-valid');
    (e) => { return true; }
  }

  if (selectFormatOutput.value === 'select-output') {
    selectFormatOutput.classList.add('is-invalid');
    selectFormatOutputError.innerHTML = msgRequired;
    e.preventDefault();
  } else {
    selectFormatOutputValue = selectFormatOutput.value;
    selectFormatOutput.classList.add('is-valid');
    (e) => { return true; }
  }

  if (selectStrength.value === 'select-strength') {
    selectStrength.classList.add('is-invalid');
    selectStrengthError.innerHTML = msgRequired;
    e.preventDefault();
  } else {
    selectStrengthValue = selectStrength.value;
    selectStrength.classList.add('is-valid');
    (e) => { return true; }
  }

  if (validateRecaptcha()) {
    e.preventDefault();
  } else {
    (e) => { return true; }
  }
  console.log('isRecaptchaValid', isRecaptchaValid)
}

function validateRecaptcha() {
  const captcha = document.querySelector('#g-recaptcha-response').value;
  const recaptchaMsg = document.getElementById('g-recaptcha-msg');
  console.log('captcha', captcha)
  fetch('/globals/recaptcha-verify', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ captcha: captcha })
  })
    .then(res => { return res.json() })
    .then(data => {
      console.log(' >>>  RESPONSE FROM ROUTE >>>  ', data)
      if (data.success) {
        recaptchaMsg.style.color = '#4BBF73';
        recaptchaMsg.innerHTML = msgCaptchaSuccess + data.msg;
        isRecaptchaValid = true;
        return true
      } else {
        recaptchaMsg.style.color = '#d9534f';
        recaptchaMsg.innerHTML = msgCaptchaError + data.msg;
        isRecaptchaValid = false;
        return false;
      }
    });
}