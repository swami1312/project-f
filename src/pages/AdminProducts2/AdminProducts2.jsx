import { useEffect, useReducer } from "react";
import Header from "../../layouts/Header";
import { TableComponent, TableRow } from "../../components/Table/Table";
import { apiReducer, initialState } from "../../services/apiReducer";
import useApiServices from "../../services/apiServices";
import apiEndPoints from "../../services/apiEndPoints";

import useRouteInformation from "../../Hooks/useRouteInformation";
import Admin2EachItem from "./Admin2EachItem";

const AdminProducts2 = () => {
  const [apiState, apiDispatch] = useReducer(apiReducer, initialState);
  const { get } = useApiServices();
  const { queryParams } = useRouteInformation();

  const headers = ["Id", "State", "Qty", "Date", "Status", "Tenant", "Act"];

  const getReqs = () => {
    get({
      apiUrl: apiEndPoints.getProductLockReqs({
        status: "ADDED-INV",
        page: queryParams.page || 0,
        size: 20,
      }),
      apiDispatch,
    });
  };

  useEffect(() => {
    getReqs();
  }, []);

  return (
    <div>
      <Header title="Admin " />
      <TableComponent
        headers={headers}
        apiState={apiState}
        colSpan={10}
        itemsLength={apiState?.data?.data?.content?.length}
        className="!max-h-[50vh] overflow-y-auto"
        totalPages={apiState?.data?.data?.totalPages}
        size={20}
      >
        {apiState?.data?.data?.content?.map((item) => (
          <Admin2EachItem item={item} />
        ))}
      </TableComponent>
    </div>
  );
};

export default AdminProducts2;
