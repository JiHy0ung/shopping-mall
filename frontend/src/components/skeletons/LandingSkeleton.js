import React from "react";
import { Col, Container, Placeholder, Row } from "react-bootstrap";
import "./skeleton.style.css";

const LandingSkeleton = () => {
  return (
    <Container>
      <Placeholder as="div" className="skeleton-title" animation="glow">
        <Placeholder xs={8} />
      </Placeholder>
      <Placeholder as="div" className="skeleton-subtitle" animation="glow">
        <Placeholder xs={3} />
        <Placeholder xs={1} />
        <Placeholder xs={4} />
      </Placeholder>
      <Placeholder as="div" className="skeleton-desc" animation="glow">
        <Placeholder xs={1} />
        <Placeholder xs={4} />
        <Placeholder xs={3} />
      </Placeholder>
      <Placeholder as="div" className="skeleton-desc" animation="glow">
        <Placeholder xs={4} />
        <Placeholder xs={1} />
        <Placeholder xs={2} />
      </Placeholder>
      <Placeholder as="div" className="skeleton-desc" animation="glow">
        <Placeholder xs={3} />
        <Placeholder xs={4} />
        <Placeholder xs={1} />
      </Placeholder>

      <Row className="skeleton-container">
        {[1, 2, 3].map((_, idx) => (
          <Col xs={12} xl={4} className="skeleton-card" key={idx}>
            <Placeholder as="div" animation="glow">
              <Placeholder id="p-img" xs={12} />
            </Placeholder>
            <Placeholder id="p-name" as="div" animation="glow">
              <Placeholder xl={8} md={5} xs={8} />
            </Placeholder>
            <Placeholder id="p-name" as="div" animation="glow">
              <Placeholder xl={4} md={3} xs={3} />
            </Placeholder>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LandingSkeleton;
