'use strict';
var currentUrl = '';

// this function will run in current tab content, not in popup.html
function testOnclick() {
  document.body.style.backgroundColor = "red";
  document.querySelector('.w3-container.top').style.backgroundColor = 'red';
  let things = {
    hey: 1,
    title: document.querySelector('#main h1').innerText
  }
  return things;
}

function setBgRed() {
  document.body.style.backgroundColor = "red";
}

document.addEventListener('DOMContentLoaded', () => {

  chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
    console.log('current tab url:', tabs[0].url);
    console.log(tabs);
    currentUrl = tabs[0].url;
    $('#tab-url').text(tabs[0].url)
  });

  $('#test').click((event) => {
    event.preventDefault();

    if (currentUrl.includes('w3schools')) {
      chrome.tabs.executeScript({
        code: '(' + testOnclick + ')();' //argument here is a string but function.toString() returns function's code
      }, (results) => {
        var things = results[0];
        $('#things').text(JSON.stringify(things));
      });
    } else {
      chrome.tabs.executeScript({
        code: '(' + setBgRed + ')();'
      }, (results) => {
        console.log(results);
      });
    }

  })
});

