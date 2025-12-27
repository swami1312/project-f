import { useEffect, useReducer, useState } from 'react';
import Header from '../../layouts/Header';
import { TableComponent, TableRow } from '../../components/Table/Table';
import { apiReducer, initialState } from '../../services/apiReducer';
import useApiServices from '../../services/apiServices';
import apiEndPoints from '../../services/apiEndPoints';
import Popup from '../../components/Popups/Popup';
import ThreeDotMenu from './../../components/ThreeDotMenu/ThreeDotMenu';
import InventoryForm from './InventoryForm';

const EachItem = ({ item }) => {
  const [showPopup, setPopup] = useState(false);
  return (
    <TableRow
      key={item.id}
      elements={[
        item.id,
        item.stateId,
        item.quantity,
        item.date || '---',
        item.status || '---',
        '---',
        <div>
          <ThreeDotMenu
            items={[
              { label: 'Add Inventory' },
              {
                label: 'Cancel',
              },
            ]}
            onSelect={(item) =>
              item.label === 'Add Inventory' && setPopup(true)
            }
          />
          <Popup
            open={showPopup}
            title="Add Inventory"
            content={<InventoryForm />}
            primaryText="Agree"
            secondaryText="Disagree"
            onPrimary={() => {
              console.log('Agreed');
              setPopup(false);
            }}
            onSecondary={() => setPopup(false)}
          />
        </div>,
        //   <IconButton>
        //     <Icon icon={iconifyIcons.threeDots} />
        //   </IconButton>,
      ]}
    />
  );
};

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
        className="!max-h-[50vh] overflow-y-auto"
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
