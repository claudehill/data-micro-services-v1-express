
//TODO: -- MINIFY THIS FILE ---

// on page load, verify whether ads are being blocked
var el = document.getElementById('04b7455ad9378c26ff2b2fad0ffed3f9e0f4e823');

var userMode;
var message; // were we contacted?...
var adblocker;
var adblockNotice = document.getElementById('adblock-notice');
var quotaColl =
  ['user-quota-uuid',
    'user-quota-randomNbr',
    'user-quota-randomTxt',
    'user-quota-json'];
// var countGuid = document.getElementById('select-guid-count');
var isHomePage = document.title.toLowerCase().includes('home');
// var selectMaxCount = document.getElementById('select-count');
// if (selectMaxCount) {
//   var options = selectMaxCount.getElementsByTagName('option');
// }

if (el && adblockNotice) {
  adblockNotice.remove();
}




//TODO: --- FIND A BETTER WAY TO IMPLEMENT THIS STUFF!!! ---

// if no session object, get one....
// if there is a session object already, clear it and fetch another one
if (sessionStorage.sessionId === undefined) {
  getNewSessionId()
} else {
  // sessionStorage.clear();
  // getNewSessionId();
}


// if we're on the results page, we don't need a token anymore ...
if (document.URL.indexOf('results') < 0) {  // <--- we are NOT on results page
  fetchToken();
}

function fetchToken() {
  fetch('/globals/token-fetch', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ adblocker: !el })
  })
    .then(res => { return res.json() })
    .then(res => {
      // console.log(res.message, res.token);
      console.log('in darkroast file, token was ............ ', res.token);
      localStorage.setItem('token', res.token['token']);
      console.log('from local storage ... ', localStorage.getItem('token'))
      return res.token;
    })
    .then(token => {
      var h = new Headers()
      h.append('Authorization', token['token'])
      fetch('/globals/token-verify', {
        method: 'POST',
        headers: h
      })
        .then(data => { return data.json() })
        .then(res => {
          console.log('  res return ... ', res)
          userMode = res.userMode;
          message = res.message;
          adblocker = res.adblocker;
          return res;
        })
        .then((res) => {
          localStorage.removeItem('userMode');
          localStorage.setItem('userMode', userMode);

          // setMaxCountRestricted();
          switch (userMode) {
            case 'RESTRICTED':
              userModeIsRestricted();
              break;
            case 'UNRESTRICTED':
              userModeIsUnrestricted();
          }
        })
        .catch(err => console.error('** ERROR ** ', err))
    })
}

// -- USER MODE RESTRICTED
function userModeIsRestricted() {
  if (isHomePage) {
    quotaColl.forEach(el => {
      var x = document.getElementById(el);
      x.classList.remove('badge-success');
      x.classList.add('badge-danger');
      x.innerText = '1 Data Element';
      x.innerText = '1 / Request';
    })
  }
  // setMaxCountRestricted();
}
// -- USER MODE UNRESTRICTED
function userModeIsUnrestricted() {
  if (isHomePage) {
    quotaColl.forEach(el => {
      var x = document.getElementById(el);
      x.classList.remove('badge-danger');
      x.classList.add('badge-success');
      x.innerText = 'Max. / Request';
    })
  }
  // setMaxCountUnrestricted();
}

var btnAdblockRetry = document.getElementById('btn-adblock-retry');
if (btnAdblockRetry) {
  btnAdblockRetry.addEventListener('click', () => {
    window.location.reload();
  })
}

var btnAdblockDismiss = document.getElementById('btn-adblock-dismiss');
if (btnAdblockDismiss) {
  btnAdblockDismiss.addEventListener('click', () => {
    $('#adblock-notice').remove();
  });
}

function getNewSessionId() {
  fetch('/globals/session-id', {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then(res => { return res.json() })
    .then(data => {
      console.info('data', data)
      sessionStorage.setItem('sessionId', JSON.stringify(data))
    })
}

