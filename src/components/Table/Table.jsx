/**
 * TableComponent
 * Reusable table component with loading, error, and empty states
 * Similar to the provided pattern
 */

import React from "react";
import { apiStatusConditions } from "../../Utils/constants";
import "./Table.scss";
import { ApiFailure, Loader } from "../Illustrations/Illustrations";
import PaginationComponent from "../PaginationComponent/PaginationComponent";

// Table Header Component
const TableHeaders = ({ headers, theadStyles }) => {
  return (
    <thead style={theadStyles}>
      <tr>
        {headers.map((each, index) => {
          if (typeof each === "boolean") {
            return null;
          } else if ([each?.type?.target, each?.type].includes("th")) {
            return each;
          } else {
            return <th key={index}>{each}</th>;
          }
        })}
      </tr>
    </thead>
  );
};

// Table Row Component
const TableRow = ({ elements, className, color, trStyles, tdStyles }) => (
  <tr
    className={className || ""}
    style={{ backgroundColor: color ? color : "", ...trStyles }}
  >
    {elements.map((each, index) => {
      if (typeof each === "boolean") {
        return null;
      } else if ([each?.type?.target, each?.type].includes("td")) {
        return each;
      } else {
        return (
          <td key={index} style={{ ...tdStyles }}>
            {each}
          </td>
        );
      }
    })}
  </tr>
);

// Table Loader Component
const TableLoader = ({ colSpan, loaderHeight }) => {
  return (
    <tr
      style={{
        height: loaderHeight || "50vh",
      }}
    >
      <td colSpan={colSpan}>
        <Loader />
      </td>
    </tr>
  );
};

// Table Error/Empty State Component
const TableIllusion = ({
  noDataText,
  failureText,
  callBackFunction,
  type,
  colSpan,
}) => {
  if (type === "error") {
    return (
      <tr>
        <td colSpan={colSpan}>
          <ApiFailure text={failureText} callBackFunction={callBackFunction} />
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td
          colSpan={colSpan}
          style={{
            textAlign: "center",
          }}
        >
          <div className="flex flex-col items-center justify-center py-12">
            <i className="fas fa-inbox text-gray-400 text-5xl mb-4"></i>
            <p className="text-gray-500">{noDataText || "No data found"}</p>
          </div>
        </td>
      </tr>
    );
  }
};

// Main Table Component
const TableComponent = (props) => {
  const {
    headers,
    theadStyles,
    apiState = "SUCCESS", // 'INITIAL', 'LOADING', 'SUCCESS', 'FAILURE'
    itemsLength,
    illusionProps = {},
    colSpan,
    containerStyle,
    inititalRow,
    loaderHeight,
    className,
    totalPages,
    pageName,
    currentPage,
    paginationCallBack,
  } = props;

  const getTableRows = () => {
    if (apiStatusConditions.success(apiState)) {
      if (itemsLength) {
        return props.children;
      } else {
        return <TableIllusion {...illusionProps} type="nd" colSpan={colSpan} />;
      }
    } else if (apiStatusConditions.failure(apiState)) {
      return (
        <TableIllusion {...illusionProps} colSpan={colSpan} type="error" />
      );
    } else if (inititalRow && apiStatusConditions.initial(apiState)) {
      return (
        <tr>
          <td
            colSpan={colSpan}
            style={{
              textAlign: "center",
            }}
          >
            <p>{inititalRow}</p>
          </td>
        </tr>
      );
    } else {
      return <TableLoader colSpan={colSpan} loaderHeight={loaderHeight} />;
    }
  };

  return (
    <>
      <div
        className={`table-container ${className}`}
        style={{
          ...containerStyle,
        }}
      >
        <table className="w-full">
          <TableHeaders headers={headers} theadStyles={theadStyles} />
          <tbody>{getTableRows()}</tbody>
        </table>
      </div>
      {apiStatusConditions.success(apiState) && (
        <div className="my-2">
          <PaginationComponent
            totalPages={totalPages}
            pageName={pageName}
            currentPage={currentPage}
            callBackFunction={paginationCallBack}
          />
        </div>
      )}
    </>
  );
};

// Styled Table Data Components (Left, Center, Right alignment)
const TableDataLeft = ({ children, style, ...props }) => (
  <td style={{ textAlign: "left", ...style }} {...props}>
    {children}
  </td>
);

const TableDataCenter = ({ children, style, ...props }) => (
  <td style={{ textAlign: "center", ...style }} {...props}>
    {children}
  </td>
);

const TableDataRight = ({ children, style, ...props }) => (
  <td style={{ textAlign: "right", ...style }} {...props}>
    {children}
  </td>
);

// Styled Table Head Components (Left, Center, Right alignment)
const TableHeadLeft = ({ children, style, ...props }) => (
  <th style={{ textAlign: "left", ...style }} {...props}>
    {children}
  </th>
);

const TableHeadCenter = ({ children, style, ...props }) => (
  <th style={{ textAlign: "center", ...style }} {...props}>
    {children}
  </th>
);

const TableHeadRight = ({ children, style, ...props }) => (
  <th style={{ textAlign: "right", ...style }} {...props}>
    {children}
  </th>
);

export {
  TableComponent,
  TableHeaders,
  TableRow,
  TableLoader,
  TableIllusion,
  TableDataLeft,
  TableDataCenter,
  TableDataRight,
  TableHeadLeft,
  TableHeadCenter,
  TableHeadRight,
};
