import { useState } from "react";
import { TableRow } from "../../components/Table/Table";

const EachInventory = ({ item, index }) => {
  return (
    <>
      <TableRow
        key={item.id}
        elements={[
          index + 1,
          item.stateId,
          item?.productId || "--",
          item?.quantity || "--",
          item?.date || "--",
          item?.status || "--",
        ]}
      />
    </>
  );
};

export default EachInventory;
