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

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const { cartItemCount } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const menuList = ["New", "Men", "Women", "Kids", "Jordan", "Sale"];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();
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
      {user && user.level === "admin" && (
        <Link to="/admin/product?page=1" className="link-area">
          Admin page
        </Link>
      )}
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

            <div onClick={() => navigate("/")} className="nav-icon">
              {/* <FontAwesomeIcon icon={faBox} /> */}
              {!isMobile && (
                <span style={{ cursor: "pointer" }}>매장 찾기</span>
              )}
            </div>

            <div className="vertical-line"></div>

            <div onClick={() => navigate("/")} className="nav-icon">
              {/* <FontAwesomeIcon icon={faBox} /> */}
              {!isMobile && <span style={{ cursor: "pointer" }}>고객센터</span>}
            </div>

            <div className="vertical-line"></div>

            {/* <div
              onClick={() => navigate("/account/purchase")}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faBox} />
              {!isMobile && <span style={{ cursor: "pointer" }}>내 주문</span>}
            </div>

            <div className="vertical-line"></div> */}

            {user ? (
              <div onClick={handleLogout} className="nav-icon">
                {/* <FontAwesomeIcon icon={faUser} /> */}
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>로그아웃</span>
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
              width="24px"
              height="24px"
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
        <div className="display-flex">
          {!isMobile && ( // admin페이지에서 같은 search-box스타일을 쓰고있음 그래서 여기서 서치박스 안보이는것 처리를 해줌
            <div className="search-box landing-search-box ">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="제품검색"
                onKeyPress={onCheckEnter}
              />
            </div>
          )}
          <div onClick={() => navigate("/cart")} className="nav-icon">
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
              <span style={{ cursor: "pointer" }}>{`쇼핑백(${
                cartItemCount || 0
              })`}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
