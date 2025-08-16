import React from "react";
import { useNavigate } from "react-router-dom";

import eventQuiz from "../../assets/nike-event-quiz.png";

const EventQuizPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <img src={eventQuiz} alt="quiz img" />
    </div>
  );
};

export default EventQuizPage;
