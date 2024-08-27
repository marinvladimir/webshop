import React from "react";

interface PageSizeDropdownProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

const PageSizeDropdown: React.FC<PageSizeDropdownProps> = ({
  pageSize,
  onPageSizeChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(event.target.value));
  };

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
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default PageSizeDropdown;
