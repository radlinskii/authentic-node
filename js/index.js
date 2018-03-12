const toogleOnClick = (buttonID, toHide, toShow) => {
  if(document.getElementById(buttonID), document.getElementById(toHide), document.getElementById(toShow))
    document.getElementById(buttonID).addEventListener('click', () => {
      document.getElementById(toHide).style.display = 'none';
      document.getElementById(toShow).style.display = 'block';
    });
};

toogleOnClick('resetPassword', 'signInContainer', 'resetPasswordContainer');
toogleOnClick('discardResetPassword', 'resetPasswordContainer', 'signInContainer');

const checkPass = () => {
  const pass = document.getElementById('password').value;
  const passRptd = document.getElementById('repeatedPassword').value;
  const submitButton = document.getElementById('signUpSubmit');
  submitButton.disabled = !(pass === passRptd && pass.length > 5);
};
