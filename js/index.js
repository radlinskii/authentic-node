const checkPass = () => {
  const pass = document.getElementById('password').value;
  const passRptd = document.getElementById('repeatedPassword').value;
  const submitButton = document.getElementById('signUpSubmit');
  submitButton.disabled = !(pass === passRptd && pass.length > 5);
};
