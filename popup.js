window.onload = function(){

  if (!localStorage["version"]) {
    localStorage["version"] = "current";
  }

  document.getElementById('version').value = localStorage["version"]; // After page load select last value

  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var url = tabs[0].url; // Get current URL

    var parser = document.createElement('a'); // Create an 'a' element for easiest parsing of URL
    parser.href = url;

    var hostname = parser.hostname;
    var pathname = parser.pathname;
    var paths = pathname.split("/");

    if (hostname == "symfony.com" && paths[1] == "doc") { // Check if user is at symfony doc
      if (paths[2] != localStorage["version"]) {
        chrome.runtime.sendMessage({redirect: "http://redirect"});
      }
    }
  });
};

/**
 * Save wanted version to localStorage
 *
 */
function saveVersion() {
  localStorage["version"] = document.getElementById("version").value;
}

/* Call saveVersion() on select box change */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#version').addEventListener('change', saveVersion);
});