window.onload = function () {
    /* Check if version and activity is set, if not, set it to default values */
    if (!localStorage['version']) {
        localStorage['version'] = 'current';
    }

    if (!localStorage['activity']) {
        localStorage['activity'] = 1;
    }

    if (!localStorage['applyToAll']) {
        localStorage['applyToAll'] = 1;
    }

    /* Select selected version */
    document.getElementById('version').value = localStorage['version'];

    /* Check checkbox if needed */
    if (localStorage['applyToAll'] === 1) {
        document.getElementById("applyToAll").checked = true;
    } else if (localStorage['applyToAll'] === 0) {
        document.getElementById("applyToAll").checked = false;
    } else {
        localStorage['applyToAll'] = 1;
        document.getElementById("applyToAll").checked = true;
    }

    /* For sure change to button */
    if (localStorage['activity'] === 1) {
        changeButton('disabled', 'Disable');
    } else if (localStorage['activity'] === 0) {
        changeButton('enabled', 'Enable');
    }

    /**
     * Save wanted version to localStorage
     *
     */
    function saveVersion() {
        localStorage['version'] = document.getElementById('version').value; // Save version

        if (localStorage['activity'] === 1) {
            refreshTabs();
        }
    }

    /**
     * Checks all tabs and redirect them to correct versions
     *
     */
    function refreshTabs() {
        if (localStorage['applyToAll'] === 0) {
            chrome.tabs.executeScript({
                file: 'content_script.js'
            });
            return false;
        }
        chrome.windows.getAll({populate: true}, function (windows) { // Affect all tabs with this settings
            windows.forEach(function (window) {
                window.tabs.forEach(function (tab) {
                    var parser = document.createElement('a'); // Create an 'a' element for easiest parsing of URL
                    parser.href = tab.url;

                    var hostname = parser.hostname // Get website
                    var pathname = parser.pathname; // Parse current url to get paths

                    if (hostname === 'symfony.com') {
                        var paths = pathname.split("/");
                        var currentVersion = paths[2];
                        var wanterVersion = localStorage['version'];

                        if (currentVersion !== wanterVersion && hostname === 'symfony.com' && paths[1] === 'doc') { // And finally if we are not in the right docs version...
                            paths[2] = wanterVersion;
                            pathname = paths.join('/'); // ...create new URL...

                            chrome.tabs.update(tab.id, {url: "https://symfony.com" + pathname}); // ...and let's redirect
                        }
                    }
                });
            });
        });
    }

    /**
     * Enable/disable activity of extension (in case you really want to browse another docs)
     *
     */
    function toggleActivity() {
        var activity = localStorage['activity'];

        if (activity === 0) {
            localStorage['activity'] = 1;
            changeButton('disabled', 'Disable');
        } else if (activity === 1) {
            localStorage['activity'] = 0;
            changeButton('enabled', 'Enable');
        } else {
            localStorage['activity'] = 1;
            changeButton('disabled', 'Disable');
        }

        if (localStorage['activity'] === 1) {
            refreshTabs();
        }
    }

    function changeButton(classname, label) {
        document.getElementById('activityButton').className = "button " + classname;
        document.getElementById('activityButton').innerHTML = label;
    }

    /**
     * Toggle applyToAll settings and check/uncheck related checkbox
     *
     */
    function toggleApplyToAll() {
        if (localStorage['applyToAll'] === 1) {
            localStorage['applyToAll'] = 0;
        } else if (localStorage['applyToAll'] === 0) {
            localStorage['applyToAll'] = 1;
            if (localStorage['activity'] === 1) {
                refreshTabs();
            }
        } else {
            localStorage['applyToAll'] = 1;
            document.getElementById("applyToAll").checked = true;
        }
    }

    /* Call saveVersion() on select box change */
    document.querySelector('#version').addEventListener('change', saveVersion);

    /* Call function toggleActivity() on button click */
    document.querySelector('#activityButton').addEventListener('click', toggleActivity);

    /* Call function toggleApplyToAll() on checkbox check */
    document.querySelector('#applyToAll').addEventListener('change', toggleApplyToAll);
}