import React, { useEffect, useState } from "react";

import "./style/AdminCoupon.style.css";
import NewCouponDialog from "./component/NewCouponDialog";
import CouponTable from "./component/CouponTable";
import { Button, Container } from "react-bootstrap";
import SearchBox from "../../common/component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCouponActive,
  getCouponList,
} from "../../features/coupon/couponSlice";

const AdminCouponPage = () => {
  const tableHeader = [
    "#",
    "쿠폰 이름",
    "쿠폰 코드",
    "할인율",
    "만료일",
    "활성화",
  ];
  const dispatch = useDispatch();
  const { couponList } = useSelector((state) => state.coupon);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    dispatch(getCouponList());
  }, []);

  const handleClickNewItem = () => {
    setShowDialog(true);
  };

  const deleteItem = (id) => {
    //아이템 삭제하기
    dispatch(updateCouponActive(id));
  };

  return (
    <div className="locate-center">
      <Container>
        <div className="search-add mt-2">
          <Button
            className="add-item-btn mt-2 mb-2"
            onClick={handleClickNewItem}
          >
            + 쿠폰 등록
          </Button>
        </div>

        <CouponTable
          header={tableHeader}
          data={couponList}
          deleteItem={deleteItem}
        />
      </Container>

      <NewCouponDialog showDialog={showDialog} setShowDialog={setShowDialog} />
    </div>
  );
};

export default AdminCouponPage;
