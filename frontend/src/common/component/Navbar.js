import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { Button, Overlay, OverlayTrigger, Popover } from "react-bootstrap";
import "../style/common.style.css";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const { cartItemCount } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const menuList = ["New", "Men", "Women", "Kids", "Jordan", "Sale"];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const handleEnter = (e) => {
    setTarget(e.target);
    setShow(true);
  };

  const handleLeave = () => {
    // 약간의 딜레이를 주고 Popover 위에 있지 않으면 닫음
    setTimeout(() => {
      if (!document.querySelector(".popover:hover")) {
        setShow(false);
      }
    }, 200);
  };

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return navigate("/");
      }
      navigate(`?name=${event.target.value}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder="제품검색"
                onKeyPress={onCheckEnter}
              />
            </div>
            <button
              className="closebtn"
              onClick={() => setShowSearchBox(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button key={index}>{menu}</button>
          ))}
        </div>
      </div>
      <div className="nav-header">
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>

        <div>
          <div className="display-flex">
            {/* <div onClick={() => navigate("/cart")} className="nav-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {!isMobile && (
                <span style={{ cursor: "pointer" }}>{`쇼핑백(${
                  cartItemCount || 0
                })`}</span>
              )}
            </div> */}

            {user && user.level === "admin" && (
              <div className="display-flex">
                <Link to="/admin/product?page=1" className="link-area">
                  Admin page
                </Link>
                <div className="vertical-line"></div>
              </div>
            )}

            {user.level !== "admin" && (
              <>
                <div onClick={() => navigate("/")} className="nav-icon">
                  {/* <FontAwesomeIcon icon={faBox} /> */}
                  {!isMobile && (
                    <span style={{ cursor: "pointer" }}>매장 찾기</span>
                  )}
                </div>

                <div className="vertical-line"></div>

                <div onClick={() => navigate("/")} className="nav-icon">
                  {/* <FontAwesomeIcon icon={faBox} /> */}
                  {!isMobile && (
                    <span style={{ cursor: "pointer" }}>고객센터</span>
                  )}
                </div>

                <div className="vertical-line"></div>
              </>
            )}

            {/* <div
              onClick={() => navigate("/account/purchase")}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faBox} />
              {!isMobile && <span style={{ cursor: "pointer" }}>내 주문</span>}
            </div>

            <div className="vertical-line"></div> */}

            <div>
              <Overlay
                show={show}
                target={target}
                placement="bottom"
                containerPadding={20}
              >
                <Popover
                  id="popover-basic"
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={handleLeave}
                >
                  <p className="popover-title">계정</p>
                  {user && user.level === "customer" && (
                    <>
                      <p className="popover-content">프로필</p>
                      <p className="popover-content">주문</p>
                      <p className="popover-content">위시리스트</p>
                      <p className="popover-content">이벤트</p>
                      <p className="popover-content">회원정보관리</p>
                    </>
                  )}
                  <p className="popover-content" onClick={handleLogout}>
                    로그아웃
                  </p>
                </Popover>
              </Overlay>
            </div>
            {user ? (
              <div className="nav-icon">
                {/* <FontAwesomeIcon icon={faUser} /> */}
                {!isMobile && (
                  <div
                    className="user-profile"
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                  >
                    <span style={{ cursor: "pointer" }}>
                      {user.name} 님, 안녕하세요
                    </span>
                    <svg
                      class="user-profile-icon"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 24 24"
                      role="img"
                      width="24px"
                      height="24px"
                      fill="none"
                    >
                      <path
                        stroke="currentColor"
                        stroke-width="2"
                        d="M3.75 21v-3a3.75 3.75 0 013.75-3.75h9A3.75 3.75 0 0120.25 18v3m-4.5-13.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div onClick={() => navigate("/register")} className="nav-icon">
                  {/* <FontAwesomeIcon icon={faUser} /> */}
                  {!isMobile && (
                    <span style={{ cursor: "pointer" }}>가입하기</span>
                  )}
                </div>

                <div className="vertical-line"></div>

                <div onClick={() => navigate("/login")} className="nav-icon">
                  {/* <FontAwesomeIcon icon={faUser} /> */}
                  {!isMobile && (
                    <span style={{ cursor: "pointer" }}>로그인</span>
                  )}
                </div>
              </>
            )}
            {isMobile && (
              <div className="nav-icon" onClick={() => setShowSearchBox(true)}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="nav-menu-area">
        <div className="nav-logo">
          <Link to="/">
            {/* <img width={100} src="/image/hm-logo.png" alt="hm-logo.png" /> */}
            <svg
              aria-hidden="true"
              class="swoosh-svg"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              className="nike-logo"
            >
              <path
                fill-rule="evenodd"
                d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>

        <ul className="menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <a href="#">{menu}</a>
            </li>
          ))}
        </ul>

        <div className="icons-area">
          {!isMobile && ( // admin페이지에서 같은 search-box스타일을 쓰고있음 그래서 여기서 서치박스 안보이는것 처리를 해줌
            <div className="search-box landing-search-box ">
              {/* <FontAwesomeIcon icon={faSearch} /> */}
              <div className="search-icon">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  role="img"
                  width="24px"
                  height="24px"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853"
                  ></path>
                </svg>
              </div>
              <input type="text" placeholder="검색" onKeyPress={onCheckEnter} />
            </div>
          )}
          <div className="wishlist-icon">
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
            >
              <path
                stroke="currentColor"
                stroke-width="1.5"
                d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451l.76.76.531.531.53-.531.76-.76a4.926 4.926 0 013.504-1.451"
              ></path>
            </svg>
          </div>
          <div onClick={() => navigate("/cart")} className="cart-icon">
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="24px"
              height="24px"
              fill="none"
            >
              <path
                stroke="currentColor"
                stroke-width="1.5"
                d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"
              ></path>
            </svg>
            {!isMobile && (
              <p className="cart-item-number">{` ${cartItemCount || 0}`}</p>
            )}
          </div>
        </div>
      </div>
      <div className="student-event-area">
        <p className="student-event-title">대학생 할인 프로그램 안내</p>
        <p className="student-event-link">자세히 보기</p>
      </div>
    </div>
  );
};

export default Navbar;
