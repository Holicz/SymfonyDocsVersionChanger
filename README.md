# About
Automatically redirects Symfony docs to preferred version. Preferred version is configurable.

# Todo
- [ ] Rewrite from scratch, because the code is awful
- [x] Load Symfony versions from remote source
- [ ] Fix infinity redirects between current and newest version written in numbers (current -> 4.0 -> current) -> 4.0 -> ...)
- [ ] Check new URL and if the result is 404, stay on current version and inform user
- [ ] When pressed back after redirect go back for two pages
- [x] Redirect all opened tabs with docs, when version is changed anywhere
- [x] Checkbox "Apply to all open tabs"
