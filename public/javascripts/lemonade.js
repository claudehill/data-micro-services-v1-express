
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
var selectMaxCount = document.getElementById('select-count');
if (selectMaxCount) {
  var options = selectMaxCount.getElementsByTagName('option');
}

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
    // console.log(res.message, res.token);
    console.log('in lemonade file, token was ............ ', res.token);
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
        
        setMaxCountRestricted();
        switch (userMode) {
          case 'RESTRICTED':
            userModeIsRestricted();
            break;
          case 'UNRESTRICTED':
            userModeIsUnrestricted();
        }
      })
      .catch(err => console.log('** ERROR ** ', err))
  })

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
  setMaxCountRestricted();
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
  setMaxCountUnrestricted();
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


function setMaxCountRestricted() {
  if (selectMaxCount) {
   selectMaxCount.disabled = false;
  // selectMaxCount.value = '1';
  // selectMaxCount.disabled = true;

  options[2].disabled = 
  options[3].disabled = 
  options[4].disabled = 
  options[5].disabled = true;   
  }

  
}

function setMaxCountUnrestricted() {
  if (selectMaxCount) {
      selectMaxCount.disabled = false;
  options[2].disabled = 
  options[3].disabled = 
  options[4].disabled = false; 
  // options[5].disabled = false; // <-- 1,000 reserved for logged in
  selectMaxCount.value = 'select-option';
  }

}

function hasSelectMaxCountDropdown() {
  return (selectMaxCount) ? true : false;
}
