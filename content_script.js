chrome.runtime.sendMessage(
  {method: "getVersion"},
  function(response) {
    var wanterVersion = response.data;
    var url = document.location.href;

    if (!wanterVersion) {
    	wanterVersion = 'current';
  	}

  	var parser = document.createElement('a'); // Create an 'a' element for easiest parsing of URL
    parser.href = url;

    var pathname = parser.pathname;
    var paths = pathname.split("/");
    var currentVersion = paths[2];

    if (currentVersion != wanterVersion) {
    	paths[2] = wanterVersion;
    	pathname = paths.join('/');

    	chrome.runtime.sendMessage({redirect: "https://symfony.com" + pathname});
    }
  }
);