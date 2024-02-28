import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import PropTypes from "prop-types";
const Table = ({ selectedSort, onSort, columns, onDelete, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ selectedSort, onSort, columns }} />
          <TableBody {...{ data, columns }} onClick={onDelete} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  selectedSort: PropTypes.object,
  onSort: PropTypes.func,
  columns: PropTypes.object,
  onDelete: PropTypes.func,
  data: PropTypes.array,
  children: PropTypes.array
};
export default Table;
