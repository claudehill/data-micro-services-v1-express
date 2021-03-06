var elCount = document.getElementById('rct-count');
var elType = document.getElementById('rct-type');
var elDataFormat = document.getElementById('rct-data-format');
var elOpFormat = document.getElementById('rct-op-format');
var elDetails = document.getElementById('rct-details');
var elReqId = document.getElementById('rct-id');
var elDateTime = document.getElementById('rct-datetime');
var txtOutput = document.getElementById('results-output')

$(document).ready(() => {
  $('#section-results-receipt').hide()
  $('#section-results-output').hide()
  setTimeout(() => {
    $('#section-loading').hide();
    $('#section-results-receipt').show();
    $('#section-results-output').show();
    // console.log('in ejs ... ', JSON.parse(sessionStorage.sessionId).sessionId)
    getReceiptForSessionId();
    getResultsForSessionId();
  }, 5000);

  var id = JSON.parse(sessionStorage.sessionId).sessionId;
  var h = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }

  function getReceiptForSessionId() {
    fetch('/results/receipt/' + id, {
      method: 'GET',
      headers: h
    })
      .then(res => { return res.json() })
      .then(data => {
        // populate the GUI with the results ...
        elCount.innerText = data.receipt.count;
        elType.innerText = data.receipt.type;
        elDataFormat.innerText = data.receipt.format;
        elOpFormat.innerText = data.receipt.formatColl;
        elReqId.innerText = data.receipt.sessionInfo.sessionId;
        elDateTime.innerText = data.receipt.sessionInfo.timestring;
        elDetails.innerText = data.receipt.strength;
        console.log(' >>> RESPONSE FROM >>> ', data.receipt)
      })
      .catch((e) => { console.error('*** ERROR *** ', e) })
  }

  function getResultsForSessionId() {
    fetch('/results/output/' + id, {
      method: 'GET',
      headers: h
    })
      .then(res => { return res.json() })
      .then(data => {
        console.log(' >>> RESULTS ROUTE  ', data)
        txtOutput.innerHTML = data.results;
      })
      .catch((e) => { console.error('*** ERROR *** ', e) })
  }

});