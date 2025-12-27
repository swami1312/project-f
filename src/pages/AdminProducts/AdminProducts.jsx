import React, { useEffect, useReducer } from 'react';
import Header from '../../layouts/Header';
import { TableComponent, TableRow } from '../../components/Table/Table';
import { apiReducer, initialState } from '../../services/apiReducer';
import useApiServices from '../../services/apiServices';
import apiEndPoints from '../../services/apiEndPoints';
import { IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import { iconifyIcons } from '../../Utils/constants';

const AdminProducts = () => {
  const [apiState, apiDispatch] = useReducer(apiReducer, initialState);
  const { get } = useApiServices();

  const headers = ['Id', 'State', 'Qty', 'Date', 'Status', 'Tenant', 'Act'];

  const getReqs = () => {
    get({
      apiUrl: apiEndPoints.getProductLockReqs(),
      apiDispatch,
    });
  };

  useEffect(() => {
    getReqs();
  }, []);

  //   console.log(apiState);

  return (
    <div>
      <Header title="Admin one" />
      <TableComponent
        headers={headers}
        apiState={apiState}
        colSpan={10}
        itemsLength={apiState?.data?.data?.content?.length}
        className="!max-h-[45vh] overflow-y-auto"
        totalPages={apiState?.data?.data?.totalPages}
        size={20}
      >
        {apiState?.data?.data?.content?.map((item) => (
          <TableRow
            key={item.id}
            elements={[
              item.id,
              item.stateId,
              item.quantity,
              item.date || '---',
              item.status || '---',
              '---',
              <IconButton>
                <Icon icon={iconifyIcons.threeDots} />
              </IconButton>,
            ]}
          />
        ))}
      </TableComponent>
    </div>
  );
};

export default AdminProducts;
