import { useState } from "react";

// 상위 카테고리 (한자 표기)
const topCategories = ["전체", "목", "화", "토", "금", "수"];
// 하위 카테고리
const subCategories = {
  목: ["갑목", "을목"],
  화: ["병화", "정화"],
  토: ["무토", "기토"],
  금: ["경금", "신금"],
  수: ["임수", "계수"],
};

// 색상/스타일 설정: 선택 시 하단 border 적용
const colorSchemes = {
  전체: {
    default: "text-gray-500",
    active: "text-black border-b-2 border-black",
  },
  목: {
    default: "text-blue-400",
    active: "text-blue-500 border-b-2 border-blue-500",
  },
  화: {
    default: "text-red-400",
    active: "text-red-500 border-b-2 border-red-500",
  },
  토: {
    default: "text-yellow-500",
    active: "text-yellow-600 border-b-2 border-yellow-600",
  },
  금: {
    default: "text-gray-400",
    active: "text-gray-600 border-b-2 border-gray-600",
  },
  수: {
    default: "text-black/70",
    active: "text-black border-b-2 border-black",
  },
};

function CommunityFilter({
  selectedTop,
  selectedSub,
  setSelectedTop,
  setSelectedSub,
}) {
  // pendingTop: 새 상위 카테고리를 클릭했으나 아직 하위 메뉴를 선택하지 않은 상태
  const [pendingTop, setPendingTop] = useState("");
  // dropdownOpen: 드롭다운이 열렸는지 여부
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 상위 버튼 클릭
  const handleTopClick = (cat) => {
    if (cat === "전체") {
      // "전체"는 바로 선택 및 필터 적용
      setSelectedTop("전체");
      setSelectedSub("");
      setPendingTop("");
      setDropdownOpen(false);
    } else {
      if (cat === selectedTop) {
        // 같은 카테고리를 재클릭 → 드롭다운 토글
        setDropdownOpen(!dropdownOpen);
      } else {
        // 다른 상위 카테고리를 클릭하면 pending 상태로 설정하고 드롭다운 열기
        setPendingTop(cat);
        setDropdownOpen(true);
      }
    }
  };

  // 하위 메뉴 클릭 시, 필터 상태 업데이트
  const handleSubClick = (sub) => {
    // 만약 pendingTop가 있다면 그걸 새로운 selectedTop으로 반영
    if (pendingTop) {
      setSelectedTop(pendingTop);
      setSelectedSub(sub);
      setPendingTop("");
    } else {
      setSelectedSub(sub);
    }
    setDropdownOpen(false);
  };

  // 버튼에 표시할 라벨: pendingTop이 있으면 pendingTop, 그렇지 않으면 selectedSub 또는 selectedTop
  const getLabel = () => {
    if (selectedTop === "전체") return "전체";
    if (pendingTop) return pendingTop;
    return selectedSub || selectedTop;
  };

  // 활성 상태: 하위 메뉴가 선택되어야 활성(전체는 항상 활성)
  const isActive = (cat) => {
    if (cat === "전체") return true;
    return cat === selectedTop && selectedSub !== "";
  };

  return (
    <div className="bg-gray-50 px-4 py-1">
      <div className="flex items-center space-x-3 pt-1">
        {topCategories.map((cat) => {
          const active = isActive(cat);
          // 만약 cat이 pendingTop와 같다면 표시할 라벨은 pendingTop, 아니면 기존 selectedTop
          const label = cat === selectedTop ? getLabel() : cat;
          return (
            <div key={cat} className="relative text-xl">
              <button
                onClick={() => handleTopClick(cat)}
                className={`px-3 py-2 text-sm transition focus:outline-none ${
                  cat === selectedTop && selectedSub !== ""
                    ? colorSchemes[cat].active
                    : colorSchemes[cat].default
                }`}
              >
                {cat === selectedTop ? label : cat}
              </button>
              {/* 드롭다운: "전체" 제외, 현재 (pendingTop or selectedTop)와 동일한 경우에만 열림 */}
              {cat !== "전체" &&
                cat === (pendingTop || selectedTop) &&
                dropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 w-max bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {subCategories[cat]?.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleSubClick(sub)}
                        className={`block w-full text-left px-3 py-2 text-sm transition ${
                          selectedSub === sub
                            ? "bg-gray-100 text-black"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CommunityFilter;
