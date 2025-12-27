import { useEffect, useReducer, useRef, useState } from 'react';
import Header from '../../layouts/Header';
import { TableComponent, TableRow } from '../../components/Table/Table';
import { apiReducer, initialState } from '../../services/apiReducer';
import useApiServices from '../../services/apiServices';
import apiEndPoints from '../../services/apiEndPoints';
import Popup from '../../components/Popups/Popup';
import ThreeDotMenu from './../../components/ThreeDotMenu/ThreeDotMenu';
import InventoryForm from './InventoryForm';
import { getDateYYYYMMDD } from '../../utils/functions';
import useHandleResponse from './../../Hooks/useHandleResponse';
import { apiStatusConditions } from '../../Utils/constants';
import { toast } from 'react-toastify';
import useRouteInformation from '../../Hooks/useRouteInformation';

const EachItem = ({ item }) => {
  const [updateState, updateDispatch] = useReducer(apiReducer, initialState);
  const [showPopup, setPopup] = useState(false);
  const formRef = useRef(null);
  const { post, put } = useApiServices();
  const { handleResponse } = useHandleResponse();

  const submit = async () => {
    const filtered = formRef.current.filter((each) => each.pdf);
    const resolved = await new Promise((resolve, reject) => {
      formRef.current.map(
        (each, index) =>
          each.pdf &&
          post({
            apiUrl: apiEndPoints.postLh(),
            body: {
              inventoryId: item.id,
              retailerSerialNumber: each.id,
              latterHeadImageUrl: each.pdf,
              currentMonth: getDateYYYYMMDD(),
              latterHeadContent: '',
              tenantId: 'ASH122',
            },
            apiDispatch: updateDispatch,
            callBackFunction: (res) => {
              if (res.success) {
                index === filtered.length - 1 && resolve('resolved');
              } else {
                reject('rejectyed');
              }
            },
          })
      );
    });

    if (resolved) {
      setPopup(false);
      toast.success('Updated');
      put({
        apiUrl: apiEndPoints.updateRetailerLockReq(item.id),
        body: {
          ...item,
          status: 'ADDED-INV',
        },
        callBackFunction: (res) => {
          handleResponse(res, {
            success: () => setPopup(false),
          });
        },
      });
    }

    // () => {
    //   setPopup(false);
    // };
  };
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
            content={<InventoryForm ref={formRef} />}
            primaryText="Update"
            secondaryText="Cancel"
            onPrimary={submit}
            onSecondary={() => setPopup(false)}
            isLoading={apiStatusConditions.inProgress(updateState)}
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
  const { queryParams } = useRouteInformation();

  const headers = ['Id', 'State', 'Qty', 'Date', 'Status', 'Tenant', 'Act'];

  const getReqs = () => {
    get({
      apiUrl: apiEndPoints.getProductLockReqs({
        // status: 'PENDING',
        page: queryParams.page || 0,
        size: 20,
      }),
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
