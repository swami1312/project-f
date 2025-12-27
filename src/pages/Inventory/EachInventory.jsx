import { useState } from "react";
import { TableRow } from "../../components/Table/Table";

const EachInventory = ({ item, index }) => {
  return (
    <>
      <TableRow
        key={item.id}
        elements={[
          index + 1,
          item.vehicleType,
          item?.gst || "--",
          item?.hsnCode || "--",
        ]}
      />
    </>
  );
};

export default EachInventory;
