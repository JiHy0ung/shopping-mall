import React from "react";
import { ControlBar, Player } from "video-react";
import "video-react/dist/video-react.css";
import nikeVideo from "../../../assets/nike_karina.mp4";

const LandingHero = () => {
  return (
    <div>
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
    </div>
  );
};

export default LandingHero;
