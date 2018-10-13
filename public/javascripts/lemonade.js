
// on page load, verify whether ads are being blocked
var el = document.getElementById('04b7455ad9378c26ff2b2fad0ffed3f9e0f4e823');

var userMode;
var message; // were we contacted?...
var adblocker;

if (el) {
  alert('Blocking Ads: No');
} else {
  alert('Blocking Ads: Yes');
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
    console.log(res.message, res.token );
    localStorage.setItem('token', res.token);
    console.log('from local storage ... ', localStorage.getItem('token'))
  })
  
  // post to '/token-test, need to set adblocker msg'
  fetch('/globals/token-verify', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

  })
  .then(res => { return res.json() })
  .then(res => {
    console.log(' res returned ... ', res)
    userMode =  res.userMode;
    message =   res.message;
    adblocker = res.adBlocker;
  })
