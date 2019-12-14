import React from 'react'; 
import '../styles/LoginForm.css';

function LoginForm() {
    function DrawLoginForm() {
        return(
            <form className="LoginForm"> 
                <div className="LogoBox">
                    닉네임 생성
                </div>
                <div className="Content">
                    <div className="ContentNickname">
                        <input 
                        placeholder="닉네임 입력"
                        />
                    </div>
                    </div>
                    <div> className="CheckNickname">
                        <button type="submit">중복확인</button>
                    </div>
            </form> 
        ); 

    }
    return (
        <div>
        <DrawLoginForm/>
        </div>
    )
}

export default LoginForm;
