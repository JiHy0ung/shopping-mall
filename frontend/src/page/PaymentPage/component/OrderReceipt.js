import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";

const OrderReceipt = ({ cartList, totalPrice }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // console.log("totalPrice", totalPrice);

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">주문 내역</h3>
      <ul className="receipt-list">
        {cartList.length > 0 &&
          cartList.map((item, index) => (
            <li key={index} className="display-flex space-between">
              <h6>
                <strong>{item.productId.name}</strong>
              </h6>
              <p>
                <strong>{item.qty}</strong> X{" "}
                <strong>
                  {currencyFormat(item.productId.price * item.qty)} 원
                </strong>
              </p>
            </li>
          ))}
        <li className="display-flex space-between">
          <h6>배송비</h6>
          <p>무료</p>
        </li>
      </ul>
      <div className="display-flex space-between receipt-total">
        <div>
          <strong>총 결제 금액</strong>
        </div>
        <div>
          <strong>{currencyFormat(totalPrice)} 원</strong>
        </div>
      </div>
      {location.pathname.includes("/cart") &&
        (cartList.length > 0 ? (
          <Button
            className="payment-button"
            onClick={() => navigate("/payment")}
          >
            주문결제
          </Button>
        ) : (
          <Button className="payment-button" disabled>
            주문결제
          </Button>
        ))}

      <div>
        가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및 배송료는
        확인되지 않습니다.
        <div>
          30일의 반품 가능 기간, 반품 수수료 및 미수취시 발생하는 추가 배송 요금
          읽어보기 반품 및 환불
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
