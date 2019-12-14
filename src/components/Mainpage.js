import React from 'react'; 
import { Link } from 'react-router';
import './mainpageStyle.css';

const MenuItem = ({active, children, to}) => (
    <Link to={to} className="menu-item">
            {children}
    </Link>
)

function Mainpage() {
    return ( 
        <div>    
            <div className="logo">
                CATCH MIND 
            </div>
            <div className="menu">
                <MenuItem to={'/'}>유저 정보</MenuItem>
                <MenuItem to={'/quizSolve'}>문제 풀기</MenuItem>
                <MenuItem to={'/quizMake'}>문제 출제하기</MenuItem>
                <MenuItem to={'/rank'}>랭킹 확인하기</MenuItem>
            </div>
        </div>                  
    ); 
}; 
export default Mainpage;