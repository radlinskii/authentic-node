document.getElementById('deleteAccount').addEventListener('click', () => {
  document.getElementById('deleteAccountContainer').style.display = 'none';
  document.getElementById('deleteAccountForm').style.display = 'block';
});

document.getElementById('reset').addEventListener('click', () => {
  document.getElementById('deleteAccountForm').style.display = 'none';
  document.getElementById('deleteAccountContainer').style.display = 'block';
});
