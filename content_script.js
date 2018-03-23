chrome.runtime.sendMessage(
    {method: "getVersion"}, // Get wanted version
    function (response) {
        var wantedVersion = response.data;

        chrome.runtime.sendMessage(
            {method: "getActivity"}, // Check if the extension is enabled
            function (activity) {

                if (activity.data == 1) {
                    var url = document.location.href; // Get current URL

                    if (!wantedVersion) { // In case this is the first time the extension loaded (no wantedVersion set)
                        wantedVersion = 'current';
                    }

                    var parser = document.createElement('a'); // Create an 'a' element for easiest parsing of URL
                    parser.href = url;

                    var hostname = parser.hostname; // Get website
                    var pathname = parser.pathname; // Parse current url to get paths
                    var paths = pathname.split("/");
                    var currentVersion = paths[2];

                    if (currentVersion != wantedVersion && hostname == 'symfony.com' && paths[1] == 'doc') { // And finally if we are not in the right docs version...
                        paths[2] = wantedVersion;
                        pathname = paths.join('/'); // ...create new URL...

                        chrome.runtime.sendMessage({redirect: "https://symfony.com" + pathname}); // ...and let's redirect
                    }
                }
            }
        );
    }
);