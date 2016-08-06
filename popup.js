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