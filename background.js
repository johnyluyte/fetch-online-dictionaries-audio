/*
  Actually we should filter URL here, but I am too lazy to do it.
  Let's just show this PageAction on ALL THE PAGES. (Yes this is stupid and should be avoided but whatever.)
*/
function checkForValidUrl(tabId, changeInfo, tab) {
  chrome.pageAction.show(tabId);
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);


/*
  `content_script.js` and `background.js` use "Message Passing" to communicate with each other.
  FYI, `background.js` controls `page action`.

  Reference:
    https://developer.chrome.com/extensions/pageAction
    https://developer.chrome.com/extensions/tabs
    https://developer.chrome.com/extensions/messaging
*/
chrome.pageAction.onClicked.addListener(function(tab){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "onClickedPageActionButton"}, function(response) {
        // do nothing
      });
    });
});
