/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AnswerModal.scss';

const GiveupModal = (props) => {
  return (
    <React.Fragment>
      <div className="Modal-overlay" />
      <div className="Modal">
        <p className="title">포기</p>
        <div className="content">
          <p>
            {`포기하시겠습니까?`}
          </p>
        </div>
        <div className="button-wrap">
          <Link to="/home">확인</Link>
        </div>
      </div>
    </React.Fragment>
  )
}
export default GiveupModal;