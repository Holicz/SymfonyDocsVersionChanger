chrome.runtime.sendMessage(
    {method: "getVersion"}, // Get wanted version
    function (response) {
        var wanterVersion = response.data;

        chrome.runtime.sendMessage(
            {method: "getActivity"}, // Check if the extension is enabled
            function (activity) {
                if (activity.data === 1) {
                    var url = document.location.href; // Get current URL

                    if (!wanterVersion) { // In case this is the first time the extension loaded (no wantedVersion set)
                        wanterVersion = 'current';
                    }

                    var parser = document.createElement('a'); // Create an 'a' element for easiest parsing of URL
                    parser.href = url;

                    var hostname = parser.hostname; // Get website
                    var pathname = parser.pathname; // Parse current url to get paths
                    var paths = pathname.split("/");
                    var currentVersion = paths[2];

                    if (currentVersion !== wanterVersion && hostname === 'symfony.com' && paths[1] === 'doc' && redirected) { // And finally if we are not in the right docs version...
                        paths[2] = wanterVersion;
                        pathname = paths.join('/'); // ...create new URL...

                        chrome.runtime.sendMessage({redirect: "https://symfony.com" + pathname}); // ...and let's redirect
                        var redirected = true;
                    }
                }
            }
        );
    }
);