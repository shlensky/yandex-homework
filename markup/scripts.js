/*
  Add scripts for demonstration purpose only.
 */
document.querySelectorAll('.Dropdown').forEach(dropdown => {
  dropdown.addEventListener('click', () => {
    dropdown.classList.toggle("Dropdown_state_opened");
  });
});
