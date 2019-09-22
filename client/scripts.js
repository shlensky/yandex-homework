/*
  Add scripts for demonstration purpose only.
 */
const dropdowns = document.querySelectorAll('.Dropdown');

function closeAllDropdowns() {
  dropdowns.forEach(dropdown => dropdown.classList.remove("Dropdown_state_opened"));
}

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', () => {
    if (dropdown.classList.contains("Dropdown_state_opened")) {
      closeAllDropdowns();
    } else {
      closeAllDropdowns();
      dropdown.classList.add("Dropdown_state_opened");
    }
  });
});

document.body.addEventListener('click', (e) => {
  if (!e.target.closest('.Dropdown')) {
    closeAllDropdowns();
  }
});
