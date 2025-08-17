import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import "../EventPage/style/event.style.css";

import eventQuiz from "../../assets/nike-event-quiz.png";
import {
  createUserCoupon,
  getUserCouponList,
} from "../../features/userCoupon/userCouponSlice";
import { COUPONS } from "../../constants/coupon.constants";

const EventQuizPage = () => {
  const dispatch = useDispatch();
  const { userCouponList } = useSelector((state) => state.userCoupon);
  const [selected, setSelected] = useState(null);
  const [quizFail, setQuizFail] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserCouponList());
  }, []);

  console.log("userCouponList", userCouponList);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selected === 3) {
      // 쿠폰 발급
      dispatch(createUserCoupon({ couponId: COUPONS.GWABGBOK80 }));
    } else {
      setQuizFail(true);
    }
  };

  const handleChange = (num) => {
    setQuizFail(false);
    if (selected === num) {
      setSelected(null);
    } else {
      setSelected(num);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className="event-quiz-container">
      <img src={eventQuiz} alt="quiz img" />
      <h2>알맞은 태극기를 골라주세요!</h2>
      <Form className="quiz-form" onSubmit={handleSubmit}>
        <div className="quiz-check">
          {[1, 2, 3, 4].map((num) => (
            <Form.Check
              inline
              label={`${num}번`}
              checked={selected === num}
              disabled={selected !== null && selected !== num}
              type="checkbox"
              id={`inline-checkbox-${num}`}
              onChange={() => handleChange(num)}
            />
          ))}
        </div>
        <div className="quiz-fail">
          {quizFail && "틀렸습니다 다시 골라주세요."}
        </div>
        <button className="quiz-btn" type="submit">
          제출
        </button>
      </Form>
      {/* <Modal className="quiz-modal" show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>축하드립니다!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          광복 80주년 기념 쿠폰 코드
          <br />
          <strong>GWANGBOK80</strong>
        </Modal.Body>
      </Modal> */}
    </Container>
  );
};

export default EventQuizPage;
