const toogleOnClick = (buttonID, toHide, toShow) => {
  if(document.getElementById(buttonID), document.getElementById(toHide), document.getElementById(toShow))
    document.getElementById(buttonID).addEventListener('click', () => {
      document.getElementById(toHide).style.display = 'none';
      document.getElementById(toShow).style.display = 'block';
    });
};

toogleOnClick('deleteAccount', 'deleteAccountContainer', 'deleteAccountForm');
toogleOnClick('discardDelete', 'deleteAccountForm', 'deleteAccountContainer');
toogleOnClick('changePassword', 'changePasswordContainer', 'changePasswordForm');
toogleOnClick('discardChangePassword', 'changePasswordForm','changePasswordContainer');
toogleOnClick('resetPassword', 'changePasswordForm','resetPasswordForm');
toogleOnClick('discardResetPassword', 'resetPasswordForm', 'changePasswordForm');
toogleOnClick('resetPassword2', 'deleteAccountForm', 'resetPasswordForm');
toogleOnClick('discardResetPassword2', 'resetPasswordForm2', 'deleteAccountForm');
toogleOnClick('unlinkGithubBtn', 'unlinkGithubContainer', 'unlinkGithubForm');
toogleOnClick('discardUnlinkGithubBtn', 'unlinkGithubForm', 'unlinkGithubContainer');
toogleOnClick('resetPassword1', 'unlinkGithubForm', 'resetPasswordForm1');
toogleOnClick('discardResetPassword1', 'resetPasswordForm1', 'unlinkGithubForm');

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
