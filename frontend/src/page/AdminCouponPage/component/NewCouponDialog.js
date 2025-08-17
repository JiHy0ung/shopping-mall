import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "../style/AdminCoupon.style.css";
import { ACTIVE, TYPE } from "../../../constants/coupon.constants";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../../../features/coupon/couponSlice";

const InitialFormData = {
  name: "",
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: 0,
  minAmount: 0,
  expireDate: "",
  isActive: "true",
};

const NewCouponDialog = ({ showDialog, setShowDialog }) => {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.coupon);
  const [valueError, setValueError] = useState(false);
  const [formData, setFormData] = useState(InitialFormData);

  useEffect(() => {
    if (success) {
      setFormData({ ...InitialFormData });
      setValueError(false);
      setShowDialog(false);
    }
  }, [success]);

  const handleChange = (event) => {
    //form에 데이터 넣어주기
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasNegative = false;
    if (formData.discountValue < 0) {
      hasNegative = true;
    }

    if (hasNegative) {
      setValueError(true);
      return;
    }

    dispatch(
      createCoupon({
        ...formData,
        isActive: formData.isActive === "true" ? true : false,
      })
    );
    setShowDialog(false);
  };

  const handleClose = () => {
    setFormData({ ...InitialFormData });
    setValueError(false);
    setShowDialog(false);
  };

  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>쿠폰 생성</Modal.Header>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>이름</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Enter Name"
              required
              value={formData.name}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="code">
            <Form.Label>코드</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Enter Code"
              required
              value={formData.code}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>설명</Form.Label>
          <Form.Control
            type="string"
            placeholder="Description"
            as="textarea"
            onChange={handleChange}
            rows={3}
            value={formData.description}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="discountType">
            <Form.Label>할인 타입</Form.Label>
            <Form.Select
              value={formData.discountType}
              onChange={handleChange}
              required
            >
              {TYPE.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="discountValue">
            <Form.Label>할인율</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Enter discount value"
              required
              value={formData.discountValue}
            />
            {valueError && (
              <span className="error-message">0 이상의 값을 입력하세요.</span>
            )}
          </Form.Group>
          <Form.Group as={Col} controlId="minAmount">
            <Form.Label>최소 구매 금액</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Enter min amount"
              required
              value={formData.minAmount}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="expireDate">
            <Form.Label>만료일</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="date"
              placeholder="Enter expireDate"
              required
              value={formData.expireDate}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="isActive">
            <Form.Label>활성화</Form.Label>
            <Form.Select
              value={formData.isActive}
              onChange={handleChange}
              required
            >
              {ACTIVE.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Button className="add-item-btn" type="submit">
          작성 완료
        </Button>
      </Form>
    </Modal>
  );
};

export default NewCouponDialog;
