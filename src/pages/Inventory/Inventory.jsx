import React, { useEffect, useReducer, useState } from "react";
import Header from "../../layouts/Header";
import { Button } from "../../components/Buttons/Buttons";
import { apiReducer, initialState } from "../../services/apiReducer";
import { TableComponent } from "../../components/Table/Table";
import Drawer from "@mui/material/Drawer";
import EachInventory from "./EachInventory";
import useApiServices from "../../services/apiServices";
import apiEndPoints from "../../services/apiEndPoints";
import axios from "axios";
import AddInventory from "./AddInventory";
import { userID } from "../../utils/functions";
import useRouteInformation from "../../Hooks/useRouteInformation";

const Inventory = () => {
  const [apiState, apiDispatch] = useReducer(apiReducer, initialState);

  const { get } = useApiServices();
  const { queryParams } = useRouteInformation();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const headers = [
    "ID",
    "State Code",
    "Product Code",
    "Quantity",
    "Date",
    "Status",
  ];

  const getAllVehicleType = () => {
    get({
      apiUrl: apiEndPoints.getUserInventory({
        size: 20,
        page: queryParams.page || 0,
      }),
      apiDispatch,
    });
  };

  useEffect(() => {
    getAllVehicleType();
  }, []);

  return (
    <div>
      <Header title="Inventory" />
      <div className="flex flex-col items-end mb-2">
        <Button text="Add" type="submit" onClick={toggleDrawer(true)} />
      </div>
      <TableComponent
        headers={headers}
        apiState={apiState}
        colSpan={10}
        itemsLength={apiState?.data?.data?.content?.length}
        className="!max-h-[45vh] overflow-y-auto"
        totalPages={apiState?.data?.data?.totalPages}
        size={20}
      >
        {apiState?.data?.data?.content?.map((item, index) => (
          <EachInventory item={item} index={index} key={item.id} />
        ))}
      </TableComponent>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
        <div className="w-96 p-4">
          <AddInventory setOpen={setOpen} getapi={getAllVehicleType} />
        </div>
      </Drawer>
    </div>
  );
};

export default Inventory;
