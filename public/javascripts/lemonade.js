
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
var isGuidPage = document.title.toLowerCase().includes('unique id');

if (el) {
  adblockNotice.remove();
}

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
    console.log(res.message, res.token);
    localStorage.setItem('token', res.token);
    console.log('from local storage ... ', localStorage.getItem('token'))
    return res.token;
  })
  .then(token => {
    var h = new Headers()
    h.append('Authorization', 'Bearer ' + token)
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
        switch (userMode) {
          case 'RESTRICTED':
            userModeIsRestrictedHomePage();
            break;
          case 'UNRESTRICTED':
            userModeIsUnrestrictedHomePage();
        }
      })
      .catch(err => console.log('** ERROR ** ', err))
  })

// -- USER MODE RESTRICTED
function userModeIsRestrictedHomePage() {
  if (isHomePage) {
    quotaColl.forEach(el => {
      var x = document.getElementById(el);
      x.classList.remove('badge-success');
      x.classList.add('badge-danger');
      x.innerText = '1 Data Element';
      x.innerText = '1 / Request';
    })
  }
}
// -- USER MODE UNRESTRICTED
function userModeIsUnrestrictedHomePage() {
  if (isHomePage) {
    quotaColl.forEach(el => {
      var x = document.getElementById(el);
      x.classList.remove('badge-danger');
      x.classList.add('badge-success');
      x.innerText = 'Max. / Request';
    })
  }
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
