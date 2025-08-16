import React from "react";
import { currencyFormat } from "../../../utils/number";
import { Col, Row } from "react-bootstrap";
import "../style/wish.style.css";
import { useDispatch } from "react-redux";
import { deleteWishItem } from "../../../features/wish/wishSlice";

const WishProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(deleteWishItem(id));
  };

  return (
    <Row className="wish-card-container">
      <div className="wish-card-img-area">
        <img
          className="wish-card-img"
          src={item.productId.image}
          alt={item.productId.name}
        />
        <button
          className="wishlist-btn"
          onClick={() => deleteItem(item.productId._id)}
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
              fill-rule="evenodd"
              d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"
              clip-rule="evenodd"
            ></path>
            <path
              fill-rule="evenodd"
              d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"
              clip-rule="evenodd"
            ></path>
            <path
              stroke-width="1.5"
              d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"
            ></path>
          </svg>
        </button>
      </div>
      <h5>{item.productId.name}</h5>
      <div>{currencyFormat(item.productId.price)} 원</div>
    </Row>
  );
};

export default WishProductCard;
