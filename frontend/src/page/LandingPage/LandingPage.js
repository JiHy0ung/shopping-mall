import React, { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import LandingHero from "./components/LandingHero";
import LandingSkeleton from "../../components/skeletons/LandingSkeleton";

const LandingPage = () => {
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

  if (loading) {
    return <LandingSkeleton />;
  }

  return (
    <>
      <LandingHero />
      <Container>{loading && <LandingSkeleton />}</Container>
    </>
  );
};

export default LandingPage;
