import { useEffect, useReducer } from "react";
import Header from "../../layouts/Header";
import { TableComponent, TableRow } from "../../components/Table/Table";
import { apiReducer, initialState } from "../../services/apiReducer";
import useApiServices from "../../services/apiServices";
import apiEndPoints from "../../services/apiEndPoints";

import useRouteInformation from "../../Hooks/useRouteInformation";
import EachItem from "./EachItem";

const AdminProducts = () => {
  const [apiState, apiDispatch] = useReducer(apiReducer, initialState);
  const { get } = useApiServices();
  const { queryParams } = useRouteInformation();

  const headers = [
    "Id",
    "State",
    "Qty",
    "Date",
    "Status",
    "Product Code",
    "Act",
  ];

  const getReqs = () => {
    get({
      apiUrl: apiEndPoints.getProductLockReqs({
        status: "PENDING",
        page: queryParams.page || 0,
        size: 20,
      }),
      apiDispatch,
    });
  };

  useEffect(() => {
    getReqs();
  }, [queryParams.page]);

  return (
    <div>
      <Header title="Admin one" />
      <TableComponent
        headers={headers}
        apiState={apiState}
        colSpan={7}
        itemsLength={apiState?.data?.data?.content?.length}
        className="!max-h-[60vh] overflow-y-auto"
        totalPages={apiState?.data?.data?.totalPages}
        size={20}
      >
        {apiState?.data?.data?.content?.map((item) => (
          <EachItem item={item} />
        ))}
      </TableComponent>
    </div>
  );
};

export default AdminProducts;
