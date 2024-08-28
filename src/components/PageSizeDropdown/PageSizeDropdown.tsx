import React from "react";
import { PageSizeDropdownProps } from "../../types";

const PageSizeDropdown: React.FC<PageSizeDropdownProps> = ({
  pageSize,
  onPageSizeChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(event.target.value));
  };

  const paginationValues = [5, 10, 20, 50, 100];

  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor="pageSize" style={{ marginRight: "10px" }}>
        Products per page:{" "}
      </label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={handleChange}
        style={{
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      >
        {paginationValues.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default PageSizeDropdown;
