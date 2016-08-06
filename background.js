chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch(message.method) {
    case "getVersion":
    	sendResponse({data: localStorage['version']});
    	break;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender) {
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
});