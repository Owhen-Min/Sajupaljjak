import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopBar2 from "../../components/TopBar2";
import SelectionGrid from "../../components/SelectionGrid";
import Dropdown from "../../components/Dropdown";
import MainButton from "../../components/MainButton";
import { provinces } from "../../data/provinceCode";
import RangeSlider from "../../components/RangeSlider";
import { useGet, usePut } from "../../hooks/useApi";

function ErrorBubble({ children }) {
  return (
    <div className="text-red-500 bg-red-50 px-3 py-2 rounded relative mt-2 text-sm before:content-[''] before:absolute before:-top-1.5 before:left-5 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-red-50">
      {children}
    </div>
  );}

function MatchFilter() {
  const navigate = useNavigate();
  const { data: initialData, isLoading } = useGet("/api/members/filter");
  const { mutate: updatePreference } = usePut();

  const religionOptions = ["무교", "개신교", "불교", "천주교", "기타"];

  const [formData, setFormData] = useState({
    smoking: null,
    drinking: null,
    minAge: 20,
    maxAge: 40,
    minHeight: 140,
    maxHeight: 220,
    regionFilter: [],
    religionFilter: [],
  });

  // 초기 데이터 로드 시 폼 데이터 설정
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSelectionChange = (field, selected) => {
    switch (field) {
      case "religion":
        setFormData((prev) => ({
          ...prev,
          religionFilter: selected.map((idx) => religionOptions[idx]),
        }));
        break;
      case "drinking":
        setFormData((prev) => ({
          ...prev,
          drinking: selected,
        }));
        break;
      case "smoking":
        setFormData((prev) => ({
          ...prev,
          smoking: selected,
        }));
        break;
      case "ageRange":
        setFormData((prev) => ({
          ...prev,
          minAge: selected[0],
          maxAge: selected[1],
        }));
        break;
      case "heightRange":
        setFormData((prev) => ({
          ...prev,
          minHeight: selected[0],
          maxHeight: selected[1],
        }));
        break;
      case "cityCode":
        setFormData((prev) => ({
          ...prev,
          regionFilter: selected,
        }));
        break;
    }
  };

  const validateForm = () => {
    const newErrors = {
      religion: formData.religionFilter.length === 0,
      smoking: formData.smoking === null,
      drinking: formData.drinking === null,
      location: formData.regionFilter.length === 0,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    updatePreference(
      {
        uri: "/api/members/filter",
        payload: formData,
      },
      {
        onSuccess: (data) => {
          console.log("필터 설정 성공:", data);
          navigate("/match"); // 성공 시 매칭 페이지로 이동
        },
        onError: (error) => {
          console.log("필터 설정 실패:", error);
          window.alert("필터 설정에 실패했습니다.");
        },
      }
    );
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="match-filter flex flex-col relative justify-center min-h-screen">
      <TopBar2 mainText="매칭 필터 설정" />
      <div className="preference-content p-5">
        <h3 className="input-prompt mb-2">선호하는 나이 범위를 선택해주세요</h3>
        <div className="input-group mb-6">
          <div className="flex justify-between mt-2 text-md text-gray-600">
            <span>{formData.minAge}세</span>
            <span>{formData.maxAge}세</span>
          </div>
          <div className="relative">
            <RangeSlider
              min={20}
              max={40}
              value={[formData.minAge, formData.maxAge]}
              keyboard={true}
              onChange={(values) => {
                handleSelectionChange("ageRange", values);
              }}
            />
          </div>
        </div>

        <h3 className="input-prompt mb-2">선호하는 종교를 선택해주세요</h3>
        <div className="input-group mb-6">
          <SelectionGrid
            cols={3}
            options={religionOptions}
            onSelect={(selected) => handleSelectionChange("religion", selected)}
            selected={formData.religionFilter.map((value) =>
              religionOptions.indexOf(value)
            )}
            showSelectAll={true}
            multiSelect={true}
          />
          {errors.religion && <ErrorBubble>종교를 선택해주세요</ErrorBubble>}
        </div>

        <h3 className="input-prompt mb-2">선호하는 음주 여부를 선택해주세요</h3>
        <div className="input-group mb-6">
          <SelectionGrid
            cols={2}
            options={["음주 안함", "주 1~2회", "주 3~4회", "주 5회 이상"]}
            onSelect={(selected) => handleSelectionChange("drinking", selected)}
            selected={formData.drinking ? [formData.drinking] : []}
          />

          {errors.drinking && (
            <ErrorBubble>음주 여부를 선택해주세요</ErrorBubble>
          )}
        </div>

        <h3 className="input-prompt mb-2">선호하는 흡연 여부를 선택해주세요</h3>
        <div className="input-group mb-6">
          <SelectionGrid
            cols={3}
            options={["비흡연", "흡연", "금연 중"]}
            onSelect={(selected) => handleSelectionChange("smoking", selected)}
            selected={formData.smoking ? [formData.smoking] : []}
          />
          {errors.smoking && (
            <ErrorBubble>흡연 여부를 선택해주세요</ErrorBubble>
          )}
        </div>

        <h3 className="input-prompt mb-2">선호하는 키 범위를 선택해주세요</h3>
        <div className="input-group mb-6">
          <div className="relative">
            <RangeSlider
              min={140}
              max={220}
              value={[formData.minHeight, formData.maxHeight]}
              keyboard={true}
              onChange={(values) =>
                handleSelectionChange("heightRange", values)
              }
            />
            <div className="flex justify-between mt-2 text-md text-gray-600">
              <span>{formData.minHeight}cm</span>
              <span>{formData.maxHeight}cm</span>
            </div>
          </div>
        </div>

        <h3 className="input-prompt mb-2">선호하는 지역을 선택해주세요</h3>
        <div className="input-group mb-6 text-sm">
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.regionFilter.map((code) => {
              const cityName = Object.keys(provinces).find(
                (key) => provinces[key].code === code
              );
              return (
                <button
                  key={code}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {cityName}
                  <span
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        regionFilter: prev.regionFilter.filter(
                          (c) => c !== code
                        ),
                      }));
                    }}
                  >
                    ×
                  </span>
                </button>
              );
            })}
          </div>
          <Dropdown
            className={"mt-3"}
            options={Object.keys(provinces).map((cityName) => ({
              value: provinces[cityName].code,
              label: cityName,
            }))}
            value=""
            placeholder="도시를 선택하세요"
            onChange={(e) => {
              const selectedCode = e.target.value;
              if (!formData.regionFilter.includes(selectedCode)) {
                setFormData((prev) => ({
                  ...prev,
                  regionFilter: [...prev.regionFilter, selectedCode],
                }));
              }
            }}
          />
          {errors.location && <ErrorBubble>지역을 선택해주세요</ErrorBubble>}
        </div>
        <MainButton
        children={"저장"}
        onClick={handleSubmit}
        className={"w-full py-3 bg-[#ff7070] text-white"}
      />
      </div>
    </div>
  );
}

export default MatchFilter;