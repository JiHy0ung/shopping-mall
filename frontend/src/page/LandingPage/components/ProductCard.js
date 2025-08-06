import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="card" onClick={() => showProduct(item._id)}>
      <img className="card-image" src={item?.image} alt={item?.image} />
      <div className="card-title">{item?.name}</div>
      <div className="card-price">{currencyFormat(item?.price)} 원</div>
    </div>
  );
};

export default ProductCard;
