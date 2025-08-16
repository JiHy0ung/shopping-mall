import React from "react";
import "./style/event.style.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import eventMainPoster from "../../assets/nike-event-poster.png";

const EventPage = () => {
  return (
    <Container className="event-container">
      <h1>광복 80주년 기념 이벤트</h1>
      <img
        className="event-main-poster"
        src={eventMainPoster}
        alt="event poster"
      />
      <h4>태극기 퀴즈 이벤트</h4>
      <p>
        광복 80주년을 맞아, 태극기 퀴즈 이벤트를 진행합니다!
        <br />
        간단한 퀴즈로 광복 80주년을 기념하고 혜택도 챙겨보세요!
      </p>
      <h4>이벤트 기간</h4>
      <p>8월 15일 ~ 8월 31일</p>
      <h4>참여 혜택</h4>
      <p>
        정답자에게 10% 할인 쿠폰 즉시 지급
        <br />
        (쿠폰은 한정 수량으로 조기 종료될 수 있음.)
      </p>
      <h4>참여 링크</h4>
      <Link to={"/event/quiz"}>이벤트 페이지로 이동하기!</Link>
    </Container>
  );
};

export default EventPage;
