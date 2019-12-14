import React, {Component} from 'react'; 
import '../styles/LoginForm.css';

class Login extends Component{
     constructor(props) { 
         super(props); 
         this.state = { 
             id: "", 
             password: "" 
            }; 
        }; 
        handleChange = (e) => {
            this.setState({
                 [e.target.name]: e.target.value 
                }); 
            }; 
        handleOnClick = (e) => {
            console.log(this.state.id, this.state.password); 
            } 
        render(){ 
            return ( 
                <form className="LoginForm"> 
                    <div className="LogoBox">
                        <h1 className="LoginHeader"> CATCH MIND </h1> 
                    </div>
                    <div className="Content">
                        ID : <input type="id" id="inputId" className="form-control" placeholder="아이디" name="id" onChange={this.handleChange}/>
                        <br></br>
                        PW : <input type="password" id="inputPW" className="form-control" placeholder="비밀번호" name="password" onChange={this.handleChange}/> 
                    </div>
                    <div className="ContentLoginBtn">
                        <button className="LoginBtn" type="button" onClick={this.handleOnClick}> Login </button> 
                    </div>
                    </form> 
                    ); 
                }; 
            } 
        export default Login;
