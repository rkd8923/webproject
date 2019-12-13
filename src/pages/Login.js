import React, { useState } from 'react';
import '../style/Login.css';

const Login = (props) => {
  const [id, setId] = useState('');

  const handleChange = (e) => {
    setId(e.target.value);
  }
  


  return (
    <div id="login-box">
      <div id="user-name">USER NAME</div>
      <form>
        <input
          placeholder="이름"
          value={ id }
          onChange={ handleChange }
        />
      </form>
      <div id="button-box">
        <button color="primary" onClick={  }>
          SIGN IN
        </button>
      </div>
    </div>
  );
}  
export default Login;