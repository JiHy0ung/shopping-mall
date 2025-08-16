import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishList } from "../../features/wish/wishSlice";
import { Col, Container, Row } from "react-bootstrap";
import WishProductCard from "./component/WishProductCard";

const WishPage = () => {
  const dispatch = useDispatch();
  const { wishList, loading } = useSelector((state) => state.wish);

  useEffect(() => {
    //카트리스트 불러오기
    dispatch(getWishList());
  }, [dispatch]);

  return (
    <Container className="wish-container">
      <h3>위시리스트</h3>
      {loading ? (
        <div>...laoding</div>
      ) : (
        <Row>
          {wishList.length > 0 ? (
            wishList.map((item) => (
              <Col xl={4} lg={6} sm={12}>
                <WishProductCard item={item} key={item._id} />
              </Col>
            ))
          ) : (
            <div className="text-align-center empty-bag">
              <h2>위시리스트가 비어있습니다.</h2>
              <div>상품을 담아주세요!</div>
            </div>
          )}
        </Row>
      )}
    </Container>
  );
};

export default WishPage;
