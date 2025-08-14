import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { currencyFormat } from "../../../utils/number";
import { updateQty, deleteCartItem } from "../../../features/cart/cartSlice";
const CartProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (id, value) => {
    dispatch(updateQty({ id, value }));
  };

  const deleteCart = (id) => {
    dispatch(deleteCartItem(id));
  };

  return (
    <div className="product-card-cart">
      <Row>
        <Col md={3} xs={12}>
          <img
            className="cart-item-img"
            src={item.productId.image}
            alt="product"
          />
          <div className="cart-product-btn">
            {item.qty > 1 ? (
              <button
                className="qty-add-button"
                onClick={() => handleQtyChange(item._id, item.qty - 1)}
              >
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
                    stroke="white"
                    stroke-miterlimit="10"
                    stroke-width="1.5"
                    d="M18 12H6"
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                className="trash-button"
                onClick={() => deleteCart(item._id)}
              >
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
                    stroke="white"
                    stroke-miterlimit="10"
                    stroke-width="1.5"
                    d="M13.75 10v7m-3.5-7v7m-3.5-8.5V17c0 1.24 1.01 2.25 2.25 2.25h6c1.24 0 2.25-1.01 2.25-2.25V7.75h2.25m-10-3h3.75c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H4.5"
                  ></path>
                </svg>
              </button>
            )}
            <div className="cart-item-qty">{item.qty}</div>
            <button
              className="qty-add-button"
              onClick={() => handleQtyChange(item._id, item.qty + 1)}
              disabled={item.qty >= 10}
            >
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
                  stroke="white"
                  stroke-miterlimit="10"
                  stroke-width="1.5"
                  d="M18 12H6m6 6V6"
                ></path>
              </svg>
            </button>
          </div>
        </Col>
        <Col md={9} xs={12}>
          <div className="display-flex space-between">
            <h4>{item.productId.name}</h4>
            <strong>
              총 {currencyFormat(item.productId.price * item.qty)} 원
            </strong>
          </div>

          <div className="cart-item-size">
            사이즈 <span> {item.size}</span>
          </div>
          <div>{currencyFormat(item.productId.price)} 원</div>
        </Col>
      </Row>
    </div>
  );
};

export default CartProductCard;
