import React, { useState } from "react";
import firebaseDb from '../../firebase.db';
import '../../styles/LoginForm.css';


const LoginForm = (props) => {
  const [nickName, setNickName] = useState('');
  const handleNickname = (e) => {
    e.preventDefault();
    setNickName(e.target.value);
  };
  const pushUserData = async () => {
    console.log('loginForm', props.user, nickName);
    if (props.user && nickName !== '') {
      firebaseDb.pushUserData({
        id: props.user.email,
        name: nickName,
        score: 0,
        solved: [],
      });
      props.setHaveId(true);
    }
  }
  return (
    <div className="login-form-box">
      <div className="LoginFormTitle">
        <h1>닉네임 생성</h1>
      </div>
        <input
          className="login-input"
          placeholder="닉네임 입력"
          value={nickName}
          onChange={handleNickname}
        />
        <div className="CreateNickname">
          <input
            className="login-button"
            type="button"
            value="생성"
            onClick={()=>pushUserData()}
          />
        </div>
    </div>
  );

 }
export default LoginForm;