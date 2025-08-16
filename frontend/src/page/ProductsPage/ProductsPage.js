import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ProductCard from "../LandingPage/components/ProductCard";
import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { getProductList } from "../../features/product/productSlice";

const ProductsPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { productList, loading } = useSelector((state) => state.product);
  const [query] = useSearchParams();
  const name = query.get("name");

  useEffect(() => {
    dispatch(
      getProductList({
        name,
      })
    );
  }, [query]);

  const filteredList =
    category === "all"
      ? productList
      : category === "new"
      ? productList.filter((item) => item.isNew === true)
      : category === "jordan"
      ? productList.filter((item) => item.category[0] === "shoes")
      : "";

  console.log("category", category);
  console.log("filteredList", filteredList);

  return (
    <Container>
      <h3>{!name && category.toUpperCase()}</h3>
      <Row>
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <Col md={4} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div className="text-align-center empty-bag">
            {name === "" ? (
              <h2>등록된 상품이 없습니다!</h2>
            ) : (
              <h2>"{name}" 과 일치한 상품이 없습니다!</h2>
            )}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default ProductsPage;
