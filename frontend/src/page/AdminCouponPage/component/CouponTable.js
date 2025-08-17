import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { currencyFormat } from "../../../utils/number";

const CouponTable = ({ header, data, deleteItem }) => {
  useEffect(() => {}, [data]);
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item.name}</th>
                <th>{item.code}</th>
                <th>
                  {item.discountValue}{" "}
                  {item.discountType === "percentage" ? " %" : " 원"}
                </th>
                <th>{item.expireDate.split("T")[0]}</th>
                <th>
                  <div className="display-flex">
                    <Button
                      onClick={() => deleteItem(item._id)}
                      className={`${
                        item.isActive ? "delete-btn" : "edit-btn"
                      } mr-1`}
                    >
                      {item.isActive ? "ON" : "OFF"}
                    </Button>
                  </div>
                </th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CouponTable;
