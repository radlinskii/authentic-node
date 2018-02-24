import React from 'react';

const RegisterPage = () => {

  return (
    <div>
      <h1>Register</h1>
      <form method='POST' action='/user/add'>
        <input type='text' placeholder='name' name='name'/>
        <input type='text' placeholder='age' name='age'/>
        <button type='submit'>SAVE</button>
      </form>
    </div>
  );
};

export default RegisterPage;
