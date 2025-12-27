import PaginationMUI from "@mui/material/Pagination";
import useRouteInformation from "../../Hooks/useRouteInformation";

const PaginationComponent = ({
  totalPages,
  pageName,
  callBackFunction,
  currentPage,
}) => {
  const { setQueryParams, queryParams } = useRouteInformation();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {totalPages > 0 && (
        <PaginationMUI
          onChange={(_, value) =>
            callBackFunction
              ? callBackFunction(value - 1)
              : setQueryParams({ [pageName || "page"]: parseInt(value) - 1 })
          }
          page={
            parseInt(
              currentPage ||
                (queryParams && queryParams[pageName || "page"]) ||
                0
            ) + 1
          }
          shape="rounded"
          count={totalPages}
          sx={{
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#fffff ",
              color: "#ff6e1f",
              "&:hover": {
                backgroundColor: "#ff6e1f",
                color: "#fff",
              },
              border: "1px solid #ff6e1f",
              borderRadius: "20px",
            },
          }}
        />
      )}
    </div>
  );
};

export default PaginationComponent;
