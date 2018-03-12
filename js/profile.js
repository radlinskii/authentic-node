const toogleOnClick = (buttonID, toHide, toShow) => {
  if(document.getElementById(buttonID), document.getElementById(toHide) && document.getElementById(toShow))
    document.getElementById(buttonID).addEventListener('click', () => {
      document.getElementById(toHide).style.display = 'none';
      document.getElementById(toShow).style.display = 'block';
    });
};

toogleOnClick('changePassword', 'changePasswordContainer', 'changePasswordForm');
toogleOnClick('discardChangePassword', 'changePasswordForm','changePasswordContainer');
toogleOnClick('resetPassword', 'changePasswordForm','resetPasswordForm');
toogleOnClick('discardResetPassword', 'resetPasswordForm', 'changePasswordForm');

toogleOnClick('unlinkGithubBtn', 'unlinkGithubContainer', 'unlinkGithubForm');
toogleOnClick('discardUnlinkGithub', 'unlinkGithubForm', 'unlinkGithubContainer');
toogleOnClick('resetPassword1', 'unlinkGithubForm', 'resetPasswordForm1');
toogleOnClick('discardResetPassword1', 'resetPasswordForm1', 'unlinkGithubForm');

toogleOnClick('deleteAccount', 'deleteAccountContainer', 'deleteAccountForm');
toogleOnClick('discardDelete', 'deleteAccountForm', 'deleteAccountContainer');
toogleOnClick('resetPassword2', 'deleteAccountForm', 'resetPasswordForm2');
toogleOnClick('discardResetPassword2', 'resetPasswordForm2', 'deleteAccountForm');

toogleOnClick('changeEmail', 'changeEmailContainer', 'changeEmailForm');
toogleOnClick('discardChangeEmail', 'changeEmailForm', 'changeEmailContainer');
toogleOnClick('resetPassword3', 'changeEmailForm', 'resetPasswordForm3');
toogleOnClick('discardResetPassword3', 'resetPasswordForm3', 'changeEmailForm');

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
