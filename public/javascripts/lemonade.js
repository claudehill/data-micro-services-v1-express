
//TODO: -- MINIFY THIS FILE ---

// on page load, verify whether ads are being blocked
var el = document.getElementById('04b7455ad9378c26ff2b2fad0ffed3f9e0f4e823');

var userMode;
var message; // were we contacted?...
var adblocker;
var adblockNotice = document.getElementById('adblock-notice');

// if (el) {
//   alert('Blocking Ads: No');
// } else {
//   alert('Blocking Ads: Yes');
// }

if (el) {
  adblockNotice.remove();
} else {
  // add notice by default ... 
  // adblockNotice.style.visibility = 'visible';
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
      })
      .catch(err => console.log('** ERROR ** ', err))
  })
