import React from "react";
import { ControlBar, Player } from "video-react";
import "video-react/dist/video-react.css";
import nikeVideo from "../../../assets/nike_karina.mp4";
import airMaxMuse from "../../../assets/hero-nike-air-max-muse.avif";
import airSuperfly from "../../../assets/hero-nike-air-superfly.avif";
import heroKrina from "../../../assets/hero-nike-karina.avif";
import { Col, Row } from "react-bootstrap";

const LandingHero = () => {
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;

  return (
    <div>
      <div className="landing-video-player-area">
        <Player
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          controls={false}
          className="landing-video-player"
        >
          <ControlBar disableDefaultControls={true} />
          <source src={nikeVideo} />
        </Player>
      </div>

      <div className="landing-main-text-area">
        <h3 className="landing-main-title">혁신적 실루엣, 에어와 만나다</h3>
        <p className="landing-main-subtitle">
          나이키 에어맥스 뮤즈 : 영감을 깨우는 혁신. 스타일을 완성하는 새로운
          차원의 무드.
        </p>
        <div className="landing-main-btn-area">
          <button className="landing-main-btn">자세히 보기</button>
          <button className="landing-main-btn">구매하기</button>
        </div>
      </div>

      <Row className="hero-img-area">
        <Col xs={12} md={6}>
          <div className="hero-img-wrapper">
            <img src={airMaxMuse} alt="air-max-muse" />
            <div className="hero-img-info">
              <p>혁신적 실루엣, 에어와 만나다</p>
              <h3>에어맥스 뮤즈</h3>
              <button className="landing-hero-btn">구매하기</button>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="hero-img-wrapper">
            <img src={airSuperfly} alt="air-superfly" />
            <div className="hero-img-info">
              <p>트랙의 무브, 스타일로 새롭게 잇다</p>
              <h3>에어 슈퍼플라이</h3>
              <button className="landing-hero-btn">구매하기</button>
            </div>
          </div>
        </Col>
      </Row>

      <div className="hero-event-area">
        <a
          href="https://www.nike.com/kr/futurerunway-event"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-event-wrapper"
        >
          <img src={heroKrina} alt="nike-karina" />
          <div className="hero-event-text-area">
            <p className="hero-event-subtitle">카리나와 함께하는</p>
            <h3 className="hero-event-title">FIND THE STYLE CODE</h3>
            <p className="hero-event-desc">
              카리나를 비롯한 스타일 리더들의 에어맥스 뮤즈 & 에어 슈퍼플라이
              룩을 확인해보세요.
              <br />
              다양한 스타일링 포토에 숨겨진 스타일 코드를 찾은 분들 중
              <br />
              추첨을 통해 카리나 친필사인 에어맥스 뮤즈 키트를 드립니다.
            </p>
            <button className="landing-hero-btn">이벤트 참여하기</button>
          </div>
        </a>
      </div>
    </div>
  );
};

export default LandingHero;
