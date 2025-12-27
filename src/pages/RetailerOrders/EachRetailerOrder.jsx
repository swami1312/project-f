import { TableRow } from "../../components/Table/Table";

const EachRetailerOrder = ({ item, index }) => {
  console.log(item.orderItemsRequestList);
  return (
    <>
      <TableRow
        key={item.id}
        elements={[
          index + 1,
          item.stateId,
          item?.orderItemsRequestList?.length
            ? item.orderItemsRequestList
                .map((eachProduct) => eachProduct?.productId)
                .join(", ")
            : "--",
          item?.totalAmount || "--",
          item?.date || "--",
        ]}
      />
    </>
  );
};

export default EachRetailerOrder;
