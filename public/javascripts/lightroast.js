const selectCount = document.getElementById('select-count');
const selectFormat = document.getElementById('select-format');
const selectFormatOutput = document.getElementById('select-output-format');
const selectStrength = document.getElementById('select-guid-strength');
const selectCountOptionSelected = selectCount.options[selectCount.selectedIndex];

const inputRandNbrLength = document.getElementById('input-rand-nbr-length');

const token = localStorage.getItem('token');
const mode = localStorage.getItem('userMode');
const btnSubmit = document.getElementById('submit-page-data');
const selectCountError = document.getElementById('invalid-select-count');
const selectFormatError = document.getElementById('invalid-select-format');
const selectFormatOutputError = document.getElementById('invalid-select-output-format');
const selectStrengthError = document.getElementById('invalid-select-guid-strength');
const msgRequired = '<i class="fas fa-exclamation-triangle"></i>  This is a required field.';
const msgCaptchaError = '<i class="fas fa-exclamation-triangle"></i>  Recaptcha error: ';
const msgCaptchaSuccess = '<i class="far fa-check-circle"></i>  Recaptcha status: ';
const gRecaptchaElement = document.getElementById('g-recaptcha');
// const formMain = document.getElementById('form-main');

let selectCountValue;
let selectFormatValue;
let selectFormatOutputValue;
let selectStrengthValue;
let isRecaptchaValid = false;
let isErrorState = false;
let sessionId;
let pagePathName = window.location.pathname;

if (selectCount) {
  var selectCountOptions = selectCount.getElementsByTagName('option');
}


// document.addEventListener("DOMContentLoaded", function(event) { 
$(document).ready(() => {
  if (mode === 'UNRESTRICTED') {
    setMaxCountUnrestricted();
  } else {
    setMaxCountRestricted();
  }

  // -- GUID PAGE
  selectCount.addEventListener('change', () => { resetErrorState(); });
  selectFormat.addEventListener('change', () => { resetErrorState(); });
  selectFormatOutput.addEventListener('change', () => { resetErrorState(); });
  selectStrength.addEventListener('change', () => { resetErrorState(); });
  // -- random number page

  btnSubmit.addEventListener('click', (e) => {
    // 1. append variable to form  & submit ... 
    appendSessionData();
    validateOptionsGuid(e);
  });
});

function resetErrorState() {
  console.log('pagePathName ... ', pagePathName)
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

function validateOptionsGuid(e) {
  let isValidCount = isValidFormat = isValidOutput = isValidStrength = isValidRecaptcha = false;

  if (selectCount.value === 'select-count') {
    selectCount.classList.add('is-invalid')
    selectCountError.innerHTML = msgRequired;
  } else {
    selectCountValue = selectCount.value;
    selectCount.classList.add('is-valid');
    isValidCount = true;
  }

  if (selectFormat.value === 'select-format') {
    selectFormat.classList.add('is-invalid');
    selectFormatError.innerHTML = msgRequired;
  } else {
    selectFormatValue = selectFormat.value;
    selectFormat.classList.add('is-valid');
    isValidFormat = true;
  }

  if (selectFormatOutput.value === 'select-output') {
    selectFormatOutput.classList.add('is-invalid');
    selectFormatOutputError.innerHTML = msgRequired;
  } else {
    selectFormatOutputValue = selectFormatOutput.value;
    selectFormatOutput.classList.add('is-valid');
    isValidOutput = true;
  }

  if (selectStrength.value === 'select-strength') {
    selectStrength.classList.add('is-invalid');
    selectStrengthError.innerHTML = msgRequired;
  } else {
    selectStrengthValue = selectStrength.value;
    selectStrength.classList.add('is-valid');
    isValidStrength = true;
  }

  getRecaptchaResponse().then(res => {
    isRecaptchaValid = res.success;
    console.log('e is ... ', e);
    console.group('output of validation .... ', [isValidCount, isValidFormat, isValidOutput, isValidRecaptcha])

    if (isValidCount && isValidFormat && isValidOutput && isValidStrength && isRecaptchaValid) {
      (e) => { return true; }
    } else {
      e.preventDefault();
    }
  })


}

function appendSessionData() {
  if (sessionStorage.sessionId) {
    var sid = JSON.parse(sessionStorage.sessionId).sessionId; // pass this on post
    $('#form-main').append("<input type='hidden' name='session-data' value='" + sessionStorage.sessionId + "' />");
    // formMain.append("<input type='hidden' name='session-data' value='" + sessionStorage.sessionId + "' />");
    return true;
  }
  return false;
}

async function getRecaptchaResponse() {
  return await validateRecaptcha();
}


//TODO: Verify referrer-policy header
function validateRecaptcha() {
  const captcha = document.querySelector('#g-recaptcha-response').value;
  const recaptchaMsg = document.getElementById('g-recaptcha-msg');
  console.log('captcha', captcha)
  return fetch('/globals/recaptcha-verify', {
    method: 'POST',
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'mode': 'cors',
      'Referrer-policy': 'same-origin'
    },
    body: JSON.parse({ captcha: captcha })
  })
    .then(res => { return res.json() })
    .then(data => {
      console.log(' >>>  RESPONSE FROM ROUTE >>>  ', data)
      if (data.success) {
        recaptchaMsg.style.color = '#4BBF73';
        recaptchaMsg.innerHTML = msgCaptchaSuccess + data.msg;
        isRecaptchaValid = true;
      } else {
        recaptchaMsg.style.color = '#d9534f';
        recaptchaMsg.innerHTML = msgCaptchaError + data.msg;
        isRecaptchaValid = false;
      }
      return data;
    })
    .catch(err => { 
      console.error('*** ERROR *** ', err) 
      alert('An error occured ... ' + err)
    })

}