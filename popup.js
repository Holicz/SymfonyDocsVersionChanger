window.onload = function(){
	/* Check if version and activity is set, if not, set it to default values */
	if (!localStorage['version']) {
		localStorage['version'] = 'current';
	}

	if (!localStorage['activity']) {
		localStorage['activity'] = 1;
	}

	/* Select selected version */
	document.getElementById('version').value = localStorage['version'];

	/* For sure change to button */
		if (localStorage['activity'] == 1) {
			changeButton('disabled', 'Disable');
		} else if (localStorage['activity'] == 0) {
			changeButton('enabled', 'Enable');
		}

	/**
	 * Save wanted version to localStorage
	 *
	 */
	function saveVersion() {
		localStorage['version'] = document.getElementById('version').value;

	 	chrome.tabs.executeScript({
	    	file: 'content_script.js'
	 	}); 
	}

	/**
	 * Enable/disable activity of extension (in case you really want to browse another docs)
	 *
	 */
	function toggleActivity() {
		var activity = localStorage['activity'];

		if (activity == 0) {
			localStorage['activity'] = 1;
			changeButton('disabled', 'Disable');
		} else if (activity == 1) {
			localStorage['activity'] = 0;
			changeButton('enabled', 'Enable');
		} else {
			localStorage['activity'] = 1;
			changeButton('disabled', 'Disable');
		}

		chrome.tabs.executeScript({
	    	file: 'content_script.js'
	  	}); 
	}

	function changeButton(classname, label) {
		document.getElementById('activityButton').className = "button " + classname;
		document.getElementById('activityButton').innerHTML = label;
	}

	/* Call saveVersion() on select box change */
	document.querySelector('#version').addEventListener('change', saveVersion);

	/* Call function toggleActivity() on button click */
	document.querySelector('#activityButton').addEventListener('click', toggleActivity);
}

