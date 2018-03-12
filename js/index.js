if(document.getElementById('resetPassword'))
  document.getElementById('resetPassword').addEventListener('click', () => {
    document.getElementById('signInContainer').style.display = 'none';
    document.getElementById('resetPasswordContainer').style.display = 'block';
  });

if(document.getElementById('discardResetPassword'))
  document.getElementById('discardResetPassword').addEventListener('click', () => {
    document.getElementById('resetPasswordContainer').style.display = 'none';
    document.getElementById('signInContainer').style.display = 'block';
  });

const checkPass = () => {
  const pass = document.getElementById('password').value;
  const passRptd = document.getElementById('repeatedPassword').value;
  const submitButton = document.getElementById('signUpSubmit');
  submitButton.disabled = !(pass === passRptd && pass.length > 5);
};
