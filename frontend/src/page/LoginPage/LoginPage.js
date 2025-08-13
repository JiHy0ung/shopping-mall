import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./style/login.style.css";
import { loginWithEmail, loginWithGoogle } from "../../features/user/userSlice";
import { clearErrors } from "../../features/user/userSlice";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loginError } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loginError) {
      dispatch(clearErrors());
    }
  }, [navigate]);

  const handleLoginWithEmail = (event) => {
    event.preventDefault();
    dispatch(loginWithEmail({ email, password }));
  };

  console.log("user", user);

  const handleGoogleLogin = async (googleData) => {
    //구글 로그인 하기
  };

  if (user) {
    navigate("/");
  }

  return (
    <>
      <Container className="login-area">
        {loginError && (
          <div className="error-message">
            <Alert variant="danger">{loginError}</Alert>
          </div>
        )}
        <Form className="login-form" onSubmit={handleLoginWithEmail}>
          <h1>로그인</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="이메일*"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="비밀번호*"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="login-button-area">
            <Button type="submit">로그인</Button>
            <div>
              아직 계정이 없으세요? <Link to="/register"> 회원가입 하기</Link>
            </div>
          </div>

          <div className="text-align-center mt-2">
            <div className="display-center">
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
