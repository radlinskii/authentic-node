import React from 'react';

const RegisterPage = () => {

  return (
    <div className='container RegisterPageComponent'>
      <ul>
        <li>Register with <a href='/auth/google' className='google+'><img src='./images/GooglePlusLogo.png' width={50} height={50}/></a></li>
        <li>Register with <a href='/auth/facebook' className='facebook'><img src='./images/FacebookLogo.png' width={50} height={50}/></a></li>
      </ul>
    </div>
  );
};

export default RegisterPage;
