/* Listener for get data functions */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch(message.method) {
    case "getVersion":
    	sendResponse({data: localStorage['version']});
    	break;
  }
});

/* Listener for redirect */
chrome.runtime.onMessage.addListener(function(request, sender) {
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
});