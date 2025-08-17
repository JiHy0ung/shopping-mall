import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import OrderReceipt from "./component/OrderReceipt";
import PaymentForm from "./component/PaymentForm";
import "./style/paymentPage.style.css";
import { cc_expires_format, currencyFormat } from "../../utils/number";
import { createOrder } from "../../features/order/orderSlice";
import {
  getUserCouponList,
  applyUserCoupon,
} from "../../features/userCoupon/userCouponSlice";
import { showToastMessage } from "../../features/common/uiSlice";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { orderNum } = useSelector((state) => state.order);
  const { userCouponList } = useSelector((state) => state.userCoupon);

  const { cartList, totalPrice } = useSelector((state) => state.cart);
  const [cardValue, setCardValue] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const navigate = useNavigate();
  const [firstLoading, setFirstLoading] = useState(true);
  const [shipInfo, setShipInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    dispatch(getUserCouponList());
    if (firstLoading) {
      setFirstLoading(false);
    } else {
      if (orderNum !== "") {
        navigate("/payment/success");
      }
    }
  }, [orderNum]);

  const calculateDiscount = (coupon, orderTotal) => {
    if (!coupon) return 0;
    if (coupon.discountType === "percentage") {
      const discount = orderTotal * (coupon.discountValue / 100);
      return discount;
    } else if (coupon.discountType === "fixed") {
      return Math.min(coupon.discountValue, orderTotal);
    }
    return 0;
  };

  const finalPrice = totalPrice - discountAmount;

  const handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, contact, address, city, zip } = shipInfo;
    dispatch(
      createOrder({
        totalPrice: finalPrice,
        shipTo: { address, city, zip },
        contact: { firstName, lastName, contact },
        orderList: cartList.map((item) => {
          return {
            productId: item.productId._id,
            size: item.size,
            qty: item.qty,
            price: item.productId.price,
          };
        }),
      })
    );
    if (selectedCoupon) {
      dispatch(applyUserCoupon({ userCouponId: selectedCoupon._id })).then(() =>
        dispatch(getUserCouponList())
      );
    }
  };

  const availableCoupons = Array.isArray(userCouponList)
    ? userCouponList.filter((coupon) => coupon.isUsed === false)
    : [];

  const handleFormChange = (event) => {
    //shipInfo에 값 넣어주기
    const { name, value } = event.target;
    if (name === "coupon") {
      if (value === "") {
        setSelectedCoupon(null);
        setDiscountAmount(0);
      } else {
        const selected = availableCoupons.find((item) => item._id === value);
        if (selected && selected.couponId) {
          if (totalPrice < selected.couponId.minAmount) {
            dispatch(
              showToastMessage({
                message: `${currencyFormat(
                  selected.couponId.minAmount
                )} 원 이상 주문시 사용 가능합니다.`,
                status: "error",
              })
            );
            return;
          }

          const discount = calculateDiscount(selected.couponId, totalPrice);
          setSelectedCoupon(selected);
          setDiscountAmount(discount);
        }
      }
    } else {
      setShipInfo({ ...shipInfo, [name]: value });
    }
  };

  const handlePaymentInfoChange = (event) => {
    //카드정보 넣어주기
    const { name, value } = event.target;
    if (name === "expiry") {
      let newValue = cc_expires_format(value);
      setCardValue({ ...cardValue, [name]: newValue });
      return;
    }

    setCardValue({ ...cardValue, [name]: value });
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };

  // 주문할 아이템이 없다면 주문하기로 안넘어가게 막음
  if (cartList?.length === 0) {
    navigate("/cart");
  }

  return (
    <Container>
      <Row>
        <Col lg={7}>
          <div>
            <h3 className="mt-2 mb-2 pay-padding">배송 주소</h3>
            <div>
              <Form onSubmit={handleSubmit}>
                <div className="pay-padding">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="lastName">
                      <Form.Label>성</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleFormChange}
                        required
                        name="lastName"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="firstName">
                      <Form.Label>이름</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleFormChange}
                        required
                        name="firstName"
                      />
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>연락처</Form.Label>
                    <Form.Control
                      placeholder="010-xxx-xxxxx"
                      onChange={handleFormChange}
                      required
                      name="contact"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>주소</Form.Label>
                    <Form.Control
                      placeholder="Apartment, studio, or floor"
                      onChange={handleFormChange}
                      required
                      name="address"
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        onChange={handleFormChange}
                        required
                        name="city"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        onChange={handleFormChange}
                        required
                        name="zip"
                      />
                    </Form.Group>
                  </Row>
                  <Form.Group as={Col} controlId="formGridCoupon">
                    <Form.Label>Coupon</Form.Label>
                    <Form.Select onChange={handleFormChange} name="coupon">
                      <option value="">쿠폰을 선택하세요</option>
                      {(Array.isArray(availableCoupons)
                        ? availableCoupons
                        : []
                      ).map((item, idx) => (
                        <option key={idx} value={item._id}>
                          {item.couponId.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="mobile-receipt-area">
                  <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
                </div>
                <div className="pay-padding">
                  <h2 className="payment-title">결제 정보</h2>
                  <PaymentForm
                    handleInputFocus={handleInputFocus}
                    cardValue={cardValue}
                    handlePaymentInfoChange={handlePaymentInfoChange}
                  />
                </div>

                <div className="pay-padding">
                  <Button
                    variant="dark"
                    className="payment-button pay-button"
                    type="submit"
                  >
                    결제하기
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
        <Col lg={5} className="receipt-area mt-2">
          <OrderReceipt
            cartList={cartList}
            totalPrice={totalPrice}
            discountAmount={discountAmount}
            finalPrice={finalPrice}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
