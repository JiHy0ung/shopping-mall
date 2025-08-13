import React from "react";
import { Container, Placeholder } from "react-bootstrap";
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

      <div className="skeleton-container">
        {[1, 2, 3].map((_, idx) => (
          <div className="skeleton-card" key={idx}>
            <Placeholder as="div" animation="glow">
              <Placeholder xs={12} style={{ height: "416px" }} />
            </Placeholder>
            <Placeholder as="div" animation="glow">
              <Placeholder xs={8} />
            </Placeholder>
            <Placeholder as="div" animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default LandingSkeleton;
