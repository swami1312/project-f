import { TableRow } from "../../components/Table/Table";
import { convertWeirdDateToDDMMYY } from "../../utils/functions";

const EachRetailerOrder = ({ item, index }) => {
  return (
    <>
      <TableRow
        key={item.id}
        elements={[
          item.orderId,
          item.stateCode,
          item?.totalAmount || "--",
          convertWeirdDateToDDMMYY(item?.orderCreatedDate) || "--",
        ]}
      />
    </>
  );
};

export default EachRetailerOrder;
