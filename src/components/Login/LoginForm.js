import React from "react";
import firebaseDb from '../../firebase.db';


const pushUserData = async (nickname) => {
    firebaseDb.pushUserData({
      name: nickname,
    });
  }

class LoginForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        nickname: "",
      };
    }
      handleNickname = e => {
        e.preventDefault();
        this.setState({
          nickname: e.target.value
        });
      };
    
      render() {
        return (
            <form className="LoginForm"> 
                <div className="LoginFormTitle">
                    <h1>닉네임 생성</h1>
                </div>
                <div className="Content">
                    <div className="ContentNickname">
                        닉네임 : <input 
                        placeholder="닉네임 입력"
                        value={this.state.nickname}
                        onChange={this.handleNickname}
                        />
                    </div>
                    <div className="CreateNickname">
                        <input
                        type="button"
                        value="생성"
                        onClick= {() => {
                            console.log(this.state.nickname);
                            pushUserData(this.state.nickname);
                          }}/>
                    </div>
                </div>
            </form>
            );
     }
 }
export default LoginForm;