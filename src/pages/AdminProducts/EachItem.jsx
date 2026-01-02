import { useReducer, useRef, useState } from "react";
import { apiReducer, initialState } from "../../services/apiReducer";
import useApiServices from "../../services/apiServices";
import useHandleResponse from "../../Hooks/useHandleResponse";
import useRouteInformation from "../../Hooks/useRouteInformation";
import apiEndPoints from "../../services/apiEndPoints";
import { getDateYYYYMMDD } from "../../utils/functions";
import { toast } from "react-toastify";
import { apiStatusConditions } from "../../Utils/constants";
import { TableRow } from "../../components/Table/Table";
import ThreeDotMenu from "../../components/ThreeDotMenu/ThreeDotMenu";

const EachItem = ({ item }) => {
  const { navigate, pathname } = useRouteInformation();

  return (
    <TableRow
      key={item.id}
      elements={[
        item.id,
        item.stateCode,
        item.quantity,
        item.date || "---",
        item.status || "---",
        item.productCode || "---",

        <div>
          <ThreeDotMenu
            items={[
              { label: "Add Inventory", value: "add" },
              {
                label: "Cancel",
                value: "cancel",
              },
            ]}
            onSelect={(menuItem) => {
              if (menuItem.value === "add") {
                navigate(`${pathname}/add-inventory/${item.id}`);
              }
            }}
          />
          {/* <Popup
            open={showPopup}
            title="Add Inventory"
            content={<InventoryForm ref={formRef} />}
            primaryText="Update"
            secondaryText="Cancel"
            onPrimary={submit}
            onSecondary={() => setPopup(false)}
            isLoading={apiStatusConditions.inProgress(updateState)}
          /> */}
        </div>,
        //   <IconButton>
        //     <Icon icon={iconifyIcons.threeDots} />
        //   </IconButton>,
      ]}
    />
  );
};
export default EachItem;
