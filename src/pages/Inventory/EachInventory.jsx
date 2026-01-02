import { TableRow } from "../../components/Table/Table";
import { convertWeirdDateToDDMMYY } from "../../utils/functions";

const EachInventory = ({ item, index }) => {
  return (
    <>
      <TableRow
        key={item.id}
        elements={[
          item.id,
          item.stateCode,
          item?.productCode || "--",
          item?.quantity || "--",
          convertWeirdDateToDDMMYY(item?.date) || "--",
          item?.status || "--",
        ]}
      />
    </>
  );
};

export default EachInventory;
