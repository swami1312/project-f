import React, { useEffect, useReducer, useState } from "react";
import Header from "../../layouts/Header";
import { Button } from "../../components/Buttons/Buttons";
import { apiReducer, initialState } from "../../services/apiReducer";
import { TableComponent } from "../../components/Table/Table";
import Drawer from "@mui/material/Drawer";
import useApiServices from "../../services/apiServices";
import apiEndPoints from "../../services/apiEndPoints";

import AddRetailerOrder from "./AddRetailerOrder";
import EachRetailerOrder from "./EachRetailerOrder";

const RetailerOrders = () => {
  const [RetailerOrdersApiState, RetailerOrdersApiDispatc] = useReducer(
    apiReducer,
    initialState
  );

  const { get } = useApiServices();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const headers = ["ID", "State", "Product", "Amount", "Date"];

  const getRetailerOrders = () => {
    get({
      apiUrl: apiEndPoints.getAllRetailersOrders(),
      apiDispatch: RetailerOrdersApiDispatc,
    });
  };

  useEffect(() => {
    getRetailerOrders();
  }, []);

  return (
    <div>
      <Header title="User Orders" />
      <div className="flex flex-col items-end mb-2">
        <Button text="Add" type="submit" onClick={toggleDrawer(true)} />
      </div>
      <TableComponent
        headers={headers}
        apiState={RetailerOrdersApiState}
        colSpan={10}
        itemsLength={RetailerOrdersApiState?.data?.data?.content?.length}
        className="!max-h-[45vh] overflow-y-auto"
        totalPages={RetailerOrdersApiState?.data?.data?.totalPages}
        size={20}
      >
        {RetailerOrdersApiState?.data?.data?.content?.map((item, index) => (
          <EachRetailerOrder item={item} index={index} key={item.id} />
        ))}
      </TableComponent>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
        <div className="w-96 p-4">
          <AddRetailerOrder setOpen={setOpen} getapi={getRetailerOrders} />
        </div>
      </Drawer>
    </div>
  );
};

export default RetailerOrders;
