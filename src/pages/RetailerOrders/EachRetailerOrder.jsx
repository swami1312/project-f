import { TableRow } from "../../components/Table/Table";
import { convertWeirdDateToDDMMYY } from "../../utils/functions";

const EachRetailerOrder = ({ item, index }) => {
  return (
    <>
      <TableRow
        key={item.id}
        elements={[
          item.orderId,
          item.userName,
          item.stateCode,
          item?.totalAmount || "--",
          (item?.orderItemsRequestList.length &&
            item?.orderItemsRequestList[0].quantity) ||
            "--",
          convertWeirdDateToDDMMYY(item?.orderCreatedDate) || "--",
        ]}
      />
    </>
  );
};

export default EachRetailerOrder;
