/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AnswerModal.scss';

const AnswerModal = (props) => {
  return (
    <React.Fragment>
      <div className="Modal-overlay" />
      <div className="Modal">
        <p className="title">정답</p>
        <div className="content">
          <p>
            {`축하합니다! ${props.score}점 상승!`}
          </p>
        </div>
        <div className="button-wrap">
          <Link className="ok" to="/home">확인</Link>
        </div>
      </div>
    </React.Fragment>
  )
}
export default AnswerModal;