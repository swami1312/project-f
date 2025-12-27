import { TableRow } from "../../components/Table/Table";

const EachRetailerOrder = ({ item, index }) => {
  console.log("first");
  return (
    <>
      <TableRow
        key={item.id}
        elements={[
          index + 1,
          item.stateId,
          item?.productId || "--",
          item?.totalAmount || "--",
          item?.date || "--",
        ]}
      />
    </>
  );
};

export default EachRetailerOrder;
