import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import OrderStatusCard from "./component/OrderStatusCard";
import "./style/orderStatus.style.css";
import { getOrder } from "../../features/order/orderSlice";
import { getUserCouponList } from "../../features/userCoupon/userCouponSlice";

const MyPage = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const { userCouponList } = useSelector((state) => state.userCoupon);

  console.log("userCouponList ", userCouponList);

  const availableCoupons = userCouponList.filter(
    (item) => item.isUsed === false
  );

  useEffect(() => {
    dispatch(getOrder());
    dispatch(getUserCouponList());
  }, [dispatch]);

  return (
    <Container className="status-card-container">
      <h3>마이페이지</h3>
      <div className="user-info-area">
        {" "}
        <p>
          <strong>이름 </strong> {user.name}
        </p>
        <p>
          <strong>이메일 </strong> {user.email}
        </p>
      </div>
      <div className="user-coupon-area">
        <h4>보유 쿠폰</h4>
        <div>
          <Row>
            {availableCoupons.map((item) => (
              <Col xs={6}>
                <div className="user-coupon-card">
                  <h5>{item.couponId.name}</h5>
                  <h6>{item.couponId.description}</h6>
                  <div className="user-coupon-info">
                    <p id="discount">
                      {item.couponId.discountValue}{" "}
                      {item.couponId.discountType === "percentage" ? "%" : "원"}{" "}
                      할인
                    </p>
                    <p id="date">{item.couponId.expireDate.split("T")[0]}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      {orderList?.length === 0 ? (
        <Container className="no-order-box">
          <div>진행중인 주문이 없습니다.</div>
        </Container>
      ) : (
        orderList.map((item, idx) => (
          <OrderStatusCard
            orderItem={item}
            className="status-card-container"
            key={item._id}
            idx={idx}
          />
        ))
      )}
    </Container>
  );
};

export default MyPage;
