import { useState } from "react";
import useRouteInformation from "../../Hooks/useRouteInformation";
import { TableRow } from "../../components/Table/Table";
import ThreeDotMenu from "../../components/ThreeDotMenu/ThreeDotMenu";

const Admin2EachItem = ({ item }) => {
  const { navigate, pathname } = useRouteInformation();
  console.log(pathname);
  return (
    <TableRow
      key={item.id}
      elements={[
        item.id,
        item.stateId,
        item.quantity,
        item.date || "---",
        item.status || "---",
        "---",
        <div>
          <ThreeDotMenu
            items={[{ label: "View", value: "view" }]}
            onSelect={(menuItem) => {
              if (menuItem.value === "view") {
                navigate(`${pathname}/View-inventory/${item.id}`);
              }
            }}
          />
          {/* <Popup
            open={showPopup}
            title="View"
            content={<InventoryForm2 />}
            primaryText="Agree"
            secondaryText="Disagree"
            onPrimary={() => {
              console.log("Agreed");
              setPopup(false);
            }}
            onSecondary={() => setPopup(false)}
          /> */}
        </div>,
        //   <IconButton>
        //     <Icon icon={iconifyIcons.threeDots} />
        //   </IconButton>,
      ]}
    />
  );
};

export default Admin2EachItem;
