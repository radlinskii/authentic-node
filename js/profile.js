if(document.getElementById('deleteAccount'))
  document.getElementById('deleteAccount').addEventListener('click', () => {
    document.getElementById('deleteAccountContainer').style.display = 'none';
    document.getElementById('deleteAccountForm').style.display = 'block';
  });

if(document.getElementById('discardDelete'))
  document.getElementById('discardDelete').addEventListener('click', () => {
    document.getElementById('deleteAccountForm').style.display = 'none';
    document.getElementById('deleteAccountContainer').style.display = 'block';
  });

if(document.getElementById('changePassword'))
  document.getElementById('changePassword').addEventListener('click', () => {
    document.getElementById('changePasswordContainer').style.display = 'none';
    document.getElementById('changePasswordForm').style.display = 'block';
  });

if(document.getElementById('discardChangePassword'))
  document.getElementById('discardChangePassword').addEventListener('click', () => {
    document.getElementById('changePasswordForm').style.display = 'none';
    document.getElementById('changePasswordContainer').style.display = 'block';
  });

const checkPass = () => {
  const passOld = document.getElementById('passwordOldInput').value;
  const passNew = document.getElementById('passwordNewInput').value;
  const passRptd = document.getElementById('repeatedPasswordNewInput').value;
  const submitBtn = document.getElementById('saveChangePassword');
  submitBtn.disabled = !(passNew === passRptd && passNew.length > 5 && passNew !== passOld);
};

const checkConnectPass = () => {
  const pass = document.getElementById('password').value;
  const passRptd = document.getElementById('repeatedPassword').value;
  const submitButton = document.getElementById('signUpSubmit');
  submitButton.disabled = !(pass === passRptd && pass.length > 5);
};
