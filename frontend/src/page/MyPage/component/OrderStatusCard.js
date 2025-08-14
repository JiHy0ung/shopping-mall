import React from "react";
import { Row, Col } from "react-bootstrap";
import { badgeBg } from "../../../constants/order.constants";
import { currencyFormat } from "../../../utils/number";

const OrderStatusCard = ({ orderItem }) => {
  return (
    <div>
      <Row className="status-card">
        <Col xs={5}>
          <img
            src={orderItem.items[0]?.productId?.image}
            alt={orderItem.items[0]?.productId?.name}
          />
        </Col>
        <Col xs={6} className="order-info">
          <p style={{ color: badgeBg[orderItem.status] }}>{orderItem.status}</p>
          <div>
            <strong>주문번호: {orderItem.orderNum}</strong>
          </div>

          <div className="text-12">{orderItem.createdAt.slice(0, 10)}</div>

          <div>
            {orderItem.items[0].productId.name}
            {orderItem.items.length > 1 && `외 ${orderItem.items.length - 1}개`}
          </div>
          <div>₩ {currencyFormat(orderItem.totalPrice)}</div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
