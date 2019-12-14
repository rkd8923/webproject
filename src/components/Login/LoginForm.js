import React, {Component} from 'react'; 
import '../styles/LoginForm.css';

function Login() {
    function DrawLoginForm() {
        return(
            <form className="LoginForm"> 
                <div className="LogoBox">
                    CATCH MIND
                </div>
                <div className="Content">
                    <div className="ContentLoginBtn">
                        <button className="LoginBtn" type="button" onClick={this.handleOnClick}> Login </button> 
                    </div>
                </div>
            </form> 
        ); 

    } 
}
export default Login;
