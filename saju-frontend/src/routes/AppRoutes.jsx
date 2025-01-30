import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LogInPage from "../pages/Login";
import PropTypes from "prop-types";

// 나중에 추가될 다른 페이지들을 위한 임시 컴포넌트들
const SignUp = () => <div>커플 등록 페이지</div>;
const Single = () => <div>싱글 상태 페이지</div>;
const Couple = () => <div>커플 상태 페이지</div>;

const SelectionGrid = ({
  rows,
  cols,
  multiSelect,
  options,
  onSelect,
  showSelectAll,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleClick = (index) => {
    if (multiSelect) {
      setSelectedItems((prev) => {
        if (prev.includes(index)) {
          return prev.filter((item) => item !== index);
        }
        return [...prev, index];
      });
    } else {
      setSelectedItems([index]);
    }

    onSelect(index);
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
      {showSelectAll && multiSelect && (
        <Button
          isSelected={selectedItems.length === options.length}
          onClick={handleSelectAll}
          style={{ marginBottom: "10px", width: "100%" }}
        >
          전체 선택
        </Button>
      )}
      <Grid cols={cols}>
        {Array(rows * cols)
          .fill(null)
          .map(
            (_, index) =>
              options[index] && (
                <Button
                  key={index}
                  isSelected={selectedItems.includes(index)}
                  onClick={() => handleClick(index)}
                >
                  {options[index]}
                </Button>
              )
          )}
      </Grid>
    </div>
  );
};

SelectionGrid.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  multiSelect: PropTypes.bool,
  options: PropTypes.array,
  onSelect: PropTypes.func,
  showSelectAll: PropTypes.bool,
};

SelectionGrid.defaultProps = {
  multiSelect: false,
  options: [],
  onSelect: () => {},
  showSelectAll: false,
};

function AppRoutes() {
  return (
    <Routes>
      {/* 메인 페이지 (온보딩) */}
      <Route path="/" element={<Home />} />

      {/* 로그인 상태에 따른 라우트들 */}
      <Route path="/login" element={<LogInPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/single" element={<Single />} />
      <Route path="/couple" element={<Couple />} />

      {/* 404 페이지 */}
      <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
}

export default AppRoutes;
