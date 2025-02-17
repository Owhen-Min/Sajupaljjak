import React, { useState } from "react";
import PropTypes from "prop-types";

const SelectionGrid = ({
  cols,
  multiSelect = false,
  options = [],
  onSelect = () => {},
  showSelectAll = false,
  selected = [],
}) => {
  const [selectedItems, setSelectedItems] = useState(
    Array.isArray(selected)
      ? selected
      : selected
      ? [options.indexOf(selected)]
      : []
  );

  const handleClick = (index) => {
    if (multiSelect) {
      const newSelected = selectedItems.includes(index)
        ? selectedItems.filter((item) => item !== index)
        : [...selectedItems, index];

      setSelectedItems(newSelected);
      onSelect(newSelected.map((idx) => options[idx]));
    } else {
      setSelectedItems([index]);
      onSelect(options[index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === options.length) {
      // 모든 항목이 선택된 경우, 전체 선택 해제
      setSelectedItems([]);
      onSelect([]);
    } else {
      // 전체 선택
      const allIndices = Array.from({ length: options.length }, (_, i) => i);
      setSelectedItems(allIndices);
      onSelect(allIndices);
    }
  };

  return (
    <div>
      <div
        className={`grid gap-2.5 w-full max-w-[600px] mx-auto`}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {showSelectAll && multiSelect && (
          <button
            className={`flex items-center justify-center py-3 px-4 border-2 rounded-lg cursor-pointer font-medium shadow-sm active:shadow-inner active:translate-y-[1px] transition-all duration-200
              ${
                selectedItems.length === options.length
                  ? "bg-[#FF7070] text-white border-[#FF7070] hover:bg-opacity-90"
                  : "bg-white text-gray-800 border-gray-100 hover:bg-gray-50"
              }`}
            onClick={handleSelectAll}
          >
            전체 선택
          </button>
        )}
        {options.map((option, index) => (
          <button
            key={index}
            className={` flex items-center justify-center py-3 px-4 border-2 rounded-lg cursor-pointer font-medium shadow-sm active:shadow-inner active:translate-y-[1px] transition-all duration-200
                ${
                  selectedItems.includes(index)
                    ? "bg-[#FF7070] text-white border-[#FF7070] hover:bg-opacity-90"
                    : "bg-white text-gray-800 border-gray-100 hover:bg-gray-50"
                }`}
            onClick={() => handleClick(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

SelectionGrid.propTypes = {
  cols: PropTypes.number.isRequired,
  multiSelect: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  showSelectAll: PropTypes.bool,
  selected: PropTypes.array,
};

export default SelectionGrid;
