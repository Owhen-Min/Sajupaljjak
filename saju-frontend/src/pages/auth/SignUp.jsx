import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SelectionGrid from "../../components/SelectionGrid";
import Dropdown from "../../components/Dropdown";
import MainButton from "../../components/MainButton";
import Input from "../../components/Input";
import { provinces } from "../../data/provinceCode";
import "../../styles/Signup.css";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/useApi";
import * as blazeface from "@tensorflow-models/blazeface";

function Header({ step, children }) {
  const getProgressWidth = () => {
    if (step < 4) return "w-1/3";
    if (step < 9) return "w-2/3";
    return "w-full";
  };

  return (
    <div className="text-gray-700 text-md flex flex-col p-5 border-b border-gray-200 bg-white bg-opacity-80 rounded-xl">
      <div className="flex items-center relative mb-2.5 opacity-100">
        {children}
      </div>
      <div className="w-full h-0.5 bg-gray-200 relative opacity-100">
        <div
          className={`absolute h-full bg-[#ff7070] transition-all duration-300 ${getProgressWidth()}`}
        />
      </div>
    </div>
  );
}

function ErrorBubble({ children }) {
  return (
    <div className="text-red-500 bg-red-50 px-3 py-2 rounded relative mt-2 text-sm before:content-[''] before:absolute before:-top-1.5 before:left-5 before:border-l-[6px] before:border-r-[6px] before:border-b-[6px] before:border-l-transparent before:border-r-transparent before:border-b-red-50">
      {children}
    </div>
  );
}

// debounce 함수를 컴포넌트 외부로 이동
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

function SignUpPage() {
  const mutation = usePost();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const { email, updateUser, user, accessToken, updateAccessToken } = useAuth();

  const [formData, setFormData] = useState({
    email: email,
    name: "",
    gender: "",
    bday: "",
    btime: "",
    age: "",
    birthTimeUnknown: false,
    religion: "",
    smoking: "",
    drinking: "",
    height: "170",
    cityCode: "",
    dongCode: "",
    profileImg: "",
    nickname: "",
    intro: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    gender: false,
    bday: false,
    btime: false,
    profileImg: false,
    nickname: false,
    religion: false,
    smoking: false,
    drinking: false,
    height: false,
    location: false,
    intro: false,
  });
  const [isFaceDetecting, setIsFaceDetecting] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [nicknameStatus, setNicknameStatus] = useState({
    isChecking: false,
    isValid: false,
    message: "",
  });

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await blazeface.load();
      setModel(loadedModel);
    };
    loadModel();
  }, [navigate, email]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));

    if (step < 4) {
      const updatedFormData = { ...formData, [name]: inputValue };
      if (step === 1 && updatedFormData.name) {
        setStep(2);
      } else if (
        step === 3 &&
        ((updatedFormData.bday && updatedFormData.btime) ||
          (updatedFormData.bday && updatedFormData.birthTimeUnknown))
      ) {
        setStep(3);
      }
    }
    
    // 문서의 최대 높이로 스크롤
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleSelectionChange = (field, selected) => {
    setFormData((prev) => {
      const newFormData = { ...prev, [field]: selected };

      if (step < 8) {
        if (step === 2 && field === "gender") {
          setTimeout(() => {
            setStep(3);
            setMaxStep(Math.max(maxStep, 4));
          }, 100);
        } else if (step === 4 && field === "religion") {
          setTimeout(() => {
            setStep(5);
            setMaxStep(Math.max(maxStep, 5));
          }, 100);
        } else if (step === 5 && field === "smoking") {
          setTimeout(() => {
            setStep(6);
            setMaxStep(Math.max(maxStep, 6));
          }, 100);
        } else if (step === 6 && field === "drinking") {
          setTimeout(() => {
            setStep(7);
            setMaxStep(Math.max(maxStep, 7));
          }, 100);
        } else if (step === 7 && field === "height") {
          setTimeout(() => {
            setStep(8);
            setMaxStep(Math.max(maxStep, 9));
          }, 100);
        }
      }

      // 문서의 최대 높이로 스크롤
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });

      return newFormData;
    });
  };

  // useCallback을 사용하여 함수를 메모이제이션
  const checkNickname = useCallback(async (nickname) => {
    if (!nickname) {
      setNicknameStatus({
        isChecking: false,
        isValid: false,
        message: "",
      });
      return;
    }

    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,20}$/;
    if (!nicknameRegex.test(nickname)) {
      setNicknameStatus({
        isChecking: false,
        isValid: false,
        message: "닉네임은 2-20자의 한글, 영문, 숫자만 사용 가능합니다",
      });
      return;
    }

    setNicknameStatus((prev) => ({ ...prev, isChecking: true }));

    try {
      const response = await fetch(
        `/api/auth?nickname=${encodeURIComponent(nickname)}`
      );
      const data = await response;
      console.log(data);

      if (response.ok) {
        setNicknameStatus({
          isChecking: false,
          isValid: true,
          message: data.message,
        });
      } else {
        setNicknameStatus({
          isChecking: false,
          isValid: false,
          message: data.message,
        });
      }
    } catch (error) {
      setNicknameStatus({
        isChecking: false,
        isValid: false,
        message: "닉네임 확인 중 오류가 발생했습니다",
      });
    }
  }, []);

  // debouncedCheckNickname을 useMemo로 메모이제이션
  const debouncedCheckNickname = useMemo(
    () => debounce(checkNickname, 1000),
    [checkNickname]
  );

  // Input 컴포넌트의 onChange 핸들러
  const handleNicknameChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
    setMaxStep(Math.max(maxStep, 10));
    setStep(Math.max(10, maxStep));
    setNicknameStatus({
      isChecking: false,
      isValid: false,
      message: "",
    });
    debouncedCheckNickname(value);
  };

  // 컴포넌트가 언마운트될 때 진행 중인 디바운스 타이머를 정리
  useEffect(() => {
    return () => {
      if (debouncedCheckNickname.cancel) {
        debouncedCheckNickname.cancel();
      }
    };
  }, [debouncedCheckNickname]);

  const validateStep = (currentStep) => {
    let isValid = true;
    const newErrors = {
      name: false,
      gender: false,
      bday: false,
      btime: false,
      religion: false,
      smoking: false,
      drinking: false,
      height: false,
      location: false,
      nickname: false,
      intro: false,
    };

    if (currentStep === 3) {
      if (!formData.name) {
        newErrors.name = true;
        isValid = false;
      }
      if (!formData.gender) {
        newErrors.gender = true;
        isValid = false;
      }
      if (
        !formData.bday ||
        formData.bday.length !== 10 ||
        (!formData.birthTimeUnknown &&
          (!formData.btime || formData.btime.length !== 5))
      ) {
        newErrors.bday = true;
        isValid = false;
      }
    } else if (currentStep === 8) {
      if (!formData.religion) {
        newErrors.religion = true;
        isValid = false;
      }
      if (!formData.smoking) {
        newErrors.smoking = true;
        isValid = false;
      }
      if (!formData.drinking) {
        newErrors.drinking = true;
        isValid = false;
      }
      if (!formData.height) {
        newErrors.height = true;
        isValid = false;
      }
      if (!formData.cityCode || !formData.dongCode) {
        newErrors.location = true;
        isValid = false;
      }
    } else if (currentStep === 12) {
      if (!formData.nickname || !nicknameStatus.isValid) {
        newErrors.nickname = true;
        isValid = false;
      }
      if (!formData.intro) {
        newErrors.intro = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const renderStep = () => {
    return (
      <div className="signup-step font-NanumR text-sm pt-8">
        {4 > step && step >= 1 && (
          <>
            <h3 className="input-prompt mb-2 text-gray-600 text-base font-semibold">
              이름
            </h3>
            <div className="input-group mb-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름"
                className="bg-gray-50 border-gray-100 border-2 shadow w-full py-3 p-2 text-base text-gray-500"
              />
              {errors.name && <ErrorBubble>이름을 입력해주세요</ErrorBubble>}
            </div>
          </>
        )}
        {4 > step && step >= 2 && (
          <>
            <h3 className="input-prompt mb-2 text-gray-600 text-base font-semibold">
              성별
            </h3>
            <div className="font-NanumR input-group mb-6">
              <SelectionGrid
                cols={2}
                options={["남성", "여성"]}
                onSelect={(selected) =>
                  handleSelectionChange("gender", selected)
                }
                selected={
                  formData.gender
                    ? [["남성", "여성"].indexOf(formData.gender)]
                    : []
                }
              />
              {errors.gender && <ErrorBubble>성별을 선택해주세요</ErrorBubble>}
            </div>
          </>
        )}
        {4 > step && step >= 3 && (
          <>
            <h3 className="input-prompt mb-2 text-gray-600 text-base font-semibold">
              태어난 시간(양력)
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <input
                className="bg-gray-50 border-gray-100 border-2 shadow w-full py-3 p-2 text-base text-gray-500"
                type="text"
                name="bday"
                value={formData.bday}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^\d/]/g, "");
                  if (value.length > 10) return;
                  const numbers = value.replace(/\//g, "");
                  if (numbers.length > 0) {
                    value = numbers.slice(0, 4);
                    if (numbers.length > 4) {
                      value += "-" + numbers.slice(4, 6);
                    }
                    if (numbers.length > 6) {
                      value += "-" + numbers.slice(6);
                    }
                  }
                  setFormData((prev) => ({
                    ...prev,
                    bday: value,
                  }));
                }}
                placeholder="2025-01-28"
                maxLength="10"
                style={{ flex: 2 }}
              />
              <input
                type="text"
                name="btime"
                value={formData.btime}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^\d:]/g, "");
                  if (value.length > 5) return;
                  const numbers = value.replace(/:/g, "");
                  if (numbers.length > 0) {
                    value = numbers.slice(0, 2);
                    if (numbers.length > 2) {
                      value += ":" + numbers.slice(2);
                    }
                  }

                  setFormData((prev) => ({
                    ...prev,
                    btime: value,
                  }));
                }}
                placeholder="00:00"
                maxLength="5"
                style={{ flex: 1 }}
                disabled={formData.birthTimeUnknown}
                className="bg-gray-50 border-gray-100 border-2 shadow w-full py-3 p-2 text-base text-gray-500"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="birthTimeUnknown"
                checked={formData.birthTimeUnknown}
                onChange={handleBirthTimeUnknown}
                style={{ cursor: "pointer" }}
              />
              <label
                htmlFor="birthTimeUnknown"
                style={{ cursor: "pointer", fontSize: "14px" }}
                className="text-gray-500"
              >
                태어난 시간 모름
              </label>
            </div>
            {errors.bday && (
              <ErrorBubble>태어난 시간을 입력해주세요</ErrorBubble>
            )}
          </>
        )}
        {9 > step && step >= 4 && (
          <>
            <h3 className="input-prompt mb-2 text-gray-600 text-base font-semibold">
              종교
            </h3>
            <div className="input-group mb-6">
              <SelectionGrid
                cols={3}
                options={["무교", "개신교", "불교", "천주교", "기타"]}
                onSelect={(selected) =>
                  handleSelectionChange("religion", selected)
                }
                selected={
                  formData.religion
                    ? [
                        ["무교", "개신교", "불교", "천주교", "기타"].indexOf(
                          formData.religion
                        ),
                      ]
                    : []
                }
              />
              {errors.religion && (
                <ErrorBubble>종교를 선택해주세요</ErrorBubble>
              )}
            </div>
          </>
        )}
        {9 > step && step >= 5 && (
          <>
            <h3 className="input-prompt mb-2 text-gray-600 text-base font-semibold">
              흡연 여부
            </h3>
            <div className="input-group mb-6">
              <SelectionGrid
                cols={3}
                options={["비흡연", "흡연", "금연 중"]}
                onSelect={(selected) =>
                  handleSelectionChange("smoking", selected)
                }
                selected={
                  formData.smoking
                    ? [["비흡연", "흡연", "금연 중"].indexOf(formData.smoking)]
                    : []
                }
              />
              {errors.smoking && (
                <ErrorBubble>흡연 여부를 선택해주세요</ErrorBubble>
              )}
            </div>
          </>
        )}
        {9 > step && step >= 6 && (
          <>
            <h3 className="input-prompt mb-2 text-gray-600 text-base font-semibold">
              음주 여부
            </h3>
            <div className="input-group mb-6">
              <SelectionGrid
                cols={2}
                options={["음주 안함", "주 1~2회", "주 3~4회", "주 5회 이상"]}
                onSelect={(selected) =>
                  handleSelectionChange("drinking", selected)
                }
                selected={
                  formData.drinking
                    ? [
                        [
                          "음주 안함",
                          "주 1~2회",
                          "주 3~4회",
                          "주 5회 이상",
                        ].indexOf(formData.drinking),
                      ]
                    : []
                }
                multiSelect={false}
              />
              {errors.drinking && (
                <ErrorBubble>음주 여부를 선택해주세요</ErrorBubble>
              )}
            </div>
          </>
        )}
        {9 > step && step >= 7 && (
          <>
            <h3 className="input-prompt mb-2 text-gray-600 text-base font-semibold">
              키
            </h3>
            <div className="input-group mb-6" style={{ position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <select
                  name="height"
                  value={formData.height || "170"}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setFormData((prev) => ({ ...prev, height: selected }));
                  }}
                  className={
                    "text-black w-30 h-10 text-center border border-gray-200 shadow rounded-md cursor-pointer bg-gray-50 bg-[url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 9L0 0h12z' fill='%23FF0000'/%3E%3C/svg%3E')] bg-no-repeat bg-right-10-center pl-4 px-6"
                  }
                  onClick={(e) => {
                    setStep(8);
                    setMaxStep(Math.max(maxStep, 9));
                  }}
                >
                  {Array.from({ length: 81 }, (_, i) => i + 140).map(
                    (height) => (
                      <option key={height} value={height} className="pl-2">
                        {height}cm
                      </option>
                    )
                  )}
                </select>
              </div>
              {errors.height && <ErrorBubble>키를 입력해주세요</ErrorBubble>}
            </div>
          </>
        )}
        {9 > step && step >= 8 && (
          <>
            <h3 className="input-prompt mb-2 text-gray-600 text-base font-semibold">
              거주지
            </h3>
            <div className="input-group">
              <div className="flex flex-row gap-2.5 w-full text-black">
                <Dropdown
                  name="cityCode"
                  value={
                    Object.keys(provinces).find(
                      (key) => provinces[key].code === formData.cityCode
                    ) || ""
                  }
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      cityCode: provinces[e.target.value]?.code || "",
                      dongCode: "",
                    }));
                  }}
                  placeholder="시/도 선택"
                  options={Object.keys(provinces).map((province) => ({
                    value: province,
                    label: province,
                  }))}
                  className="flex-1"
                />

                {formData.cityCode && (
                  <Dropdown
                    name="dongCode"
                    value={(() => {
                      const selectedSi = Object.keys(provinces).find(
                        (key) => provinces[key].code === formData.cityCode
                      );
                      return (
                        Object.keys(provinces[selectedSi]?.sigungu || {}).find(
                          (key) =>
                            provinces[selectedSi]?.sigungu[key] ===
                            formData.dongCode
                        ) || ""
                      );
                    })()}
                    onChange={(e) => {
                      const selectedSi = Object.keys(provinces).find(
                        (key) => provinces[key].code === formData.cityCode
                      );
                      const selectedDongCode =
                        provinces[selectedSi]?.sigungu[e.target.value];
                      setFormData((prev) => ({
                        ...prev,
                        dongCode: selectedDongCode,
                      }));
                    }}
                    placeholder="구/군 선택"
                    options={Object.keys(
                      provinces[
                        Object.keys(provinces).find(
                          (key) => provinces[key].code === formData.cityCode
                        )
                      ].sigungu
                    ).map((district) => {
                      const selectedSi = Object.keys(provinces).find(
                        (key) => provinces[key].code === formData.cityCode
                      );
                      const districtName = district
                        .replace(selectedSi, "")
                        .replace(/^\s+/, "");
                      return {
                        value: district,
                        label: districtName,
                      };
                    })}
                    className="flex-1"
                  />
                )}
              </div>
              {errors.location && (
                <ErrorBubble>거주지를 모두 선택해주세요</ErrorBubble>
              )}
            </div>
          </>
        )}
        {step >= 9 && (
          <>
            <h3 className="input-prompt mb-2 text-gray-600 text-base font-semibold">
              닉네임
            </h3>
            <div className="input-group mb-6">
              <div className="flex flex-col w-full">
                <div className="relative">
                  <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleNicknameChange}
                    placeholder="닉네임"
                    className={`${
                      nicknameStatus.message
                        ? nicknameStatus.isValid
                          ? "border-green-500 bg-gray-50 border-2 shadow w-full py-3 p-2 text-base text-gray-500"
                          : "border-red-500 bg-gray-50  border-2 shadow w-full py-3 p-2 text-base text-gray-500"
                        : "bg-gray-50 border-gray-100 rounded-md border-2 shadow w-full py-3 p-2 text-base text-gray-500"
                    }`}
                  />
                  {nicknameStatus.isChecking && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                {nicknameStatus.message && (
                  <div
                    className={`text-sm mt-1 ${
                      nicknameStatus.isValid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {nicknameStatus.message}
                  </div>
                )}
                {errors.nickname && (
                  <ErrorBubble>닉네임을 입력해주세요</ErrorBubble>
                )}
              </div>
            </div>
          </>
        )}
        {step >= 10 && (
          <>
            <h3 className="input-prompt mb-2 text-gray-600 text-base font-semibold">
              자기소개
            </h3>
            <div className="input-group mb-6">
              <div className="flex flex-col w-full">
                <textarea
                  name="intro"
                  value={formData.intro}
                  onChange={(e) => {
                    handleInputChange(e);
                    setMaxStep(Math.max(maxStep, 11));
                    setStep(Math.max(maxStep, 11));
                  }}
                  placeholder="자기소개를 입력해주세요"
                  className=" text-gray-700 w-full h-32 p-3 border bg-gray-50 border-gray-200 shadow rounded-md resize-none text-base"
                  maxLength={500}
                />
                {errors.intro && (
                  <ErrorBubble>자기소개를 입력해주세요</ErrorBubble>
                )}
              </div>
            </div>
          </>
        )}
        {step >= 11 && (
          <>
            <h3 className="input-prompt mb-2 text-gray-600 text-base font-semibold">
              프로필 사진
            </h3>
            <div className="input-group mb-6">
              <div className="flex flex-col w-full items-center">
                <input
                  type="file"
                  name="profileImg"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="profileImgInput"
                />
                <label
                  htmlFor="profileImgInput"
                  className="flex flex-col items-center cursor-pointer w-full"
                >
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full mb-4 flex items-center justify-center overflow-hidden hover:border-red-500 transition-colors">
                    {formData.profileImg ? (
                      <img
                        src={formData.profileImg}
                        alt="프로필 미리보기"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-black">사진 추가</span>
                    )}
                  </div>
                  <span className="bg-[#ff7070] text-white px-4 py-2 rounded hover:bg-red-600">
                    사진 선택하기
                  </span>
                </label>
                {errors.profileImg && (
                  <ErrorBubble>프로필 사진을 등록해주세요</ErrorBubble>
                )}
              </div>
            </div>
            {isFaceDetecting && (
              <div className="text-sm text-gray-500 mt-2">얼굴 인식 중...</div>
            )}
            {!isFaceDetecting && !faceDetected && formData.profileImg && (
              <div className="text-sm text-red-500 mt-2">
                얼굴이 포함된 사진을 업로드해주세요
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const handleSubmit = async () => {
    if (validateStep(step)) {
      setIsLoading(true);
      try {
        const birthYear = new Date(formData.bday).getFullYear();
        const currentYear = new Date().getFullYear();
        const calculatedAge = currentYear - birthYear + 1;

        const signupPayload = {
          ...formData,
          age: calculatedAge.toString(),
        };

        if (
          formData.profileImg &&
          formData.profileImg.startsWith("data:image")
        ) {
          const imageFile = await fetch(formData.profileImg)

            .then((res) => res.blob())
            .then((blob) => {
              const uniqueFileName = `profile_${Date.now()}_${Math.random()
                .toString(36)
                .substring(7)}.webp`;
              return new File([blob], uniqueFileName, { type: "image/webp" });
            });

          const presignResponse = await mutation.mutateAsync({
            uri: "/api/image",
            payload: { filename: imageFile.name },
          });

          const { presignedUrl, objectKey } = presignResponse;

          const uploadResponse = await fetch(presignedUrl, {
            method: "PUT",
            headers: { "Content-Type": imageFile.type },
            body: imageFile,
          });

          if (!uploadResponse.ok) {
            throw new Error("S3 파일 업로드 실패");
          }

          const signupResponse = await mutation.mutateAsync({
            uri: "/api/auth/signup",
            payload: {
              ...signupPayload,
              profileImg: `https://saju-bucket.s3.us-east-2.amazonaws.com/${objectKey}`,
            },
          });

          console.log("회원가입 성공 응답 데이터:", signupResponse);
          const { token, ...userData } = signupResponse;
          localStorage.setItem("accessToken", token.accessToken);
          localStorage.setItem("refreshToken", token.refreshToken);
          localStorage.setItem("memberId", userData.member_id);
          localStorage.setItem(
            "relation",
            userData.relation === "SOLO" ? false : true
          );
          localStorage.setItem("user", JSON.stringify(userData));
          updateUser(userData);
          console.log(user);
          setIsLoading(false);
          navigate("/auth/welcome");
        }
      } catch (error) {
        console.error("회원가입 실패:", error);
        window.alert("회원가입 실패: " + error.message);
        setIsLoading(false);
      }
    }
  };

  const handleNextStep = () => {
    if (step < 9) {
      if (!validateStep(step)) {
        return;
      }

      let nextStep;
      if (step === 3) {
        nextStep = Math.min(8, maxStep);
      } else if (step === 8) {
        nextStep = Math.min(12, maxStep);
      }

      setStep(nextStep);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleBirthTimeUnknown = (e) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      birthTimeUnknown: isChecked,
      btime: isChecked ? "00:00" : "",
    }));
  };

  const detectFace = async (imageUrl) => {
    if (!model) return false;

    setIsFaceDetecting(true);

    try {
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const predictions = await model.estimateFaces(img, false);
      setFaceDetected(predictions.length > 0);

      if (predictions.length === 0) {
        alert("얼굴이 포함된 사진을 업로드해주세요.");
        return false;
      }

      return true;
    } catch (error) {
      console.error("얼굴 감지 중 오류 발생:", error);
      return false;
    } finally {
      setIsFaceDetecting(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target.result;
        const hasFace = await detectFace(imageUrl);

        if (hasFace) {
          const convertToWebP = (imageData) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxSize = 1024;
                let width = img.width;
                let height = img.height;

                if (width > maxSize || height > maxSize) {
                  if (width > height) {
                    height = (height * maxSize) / width;
                    width = maxSize;
                  } else {
                    width = (width * maxSize) / height;
                    height = maxSize;
                  }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                resolve(canvas.toDataURL("image/webp", 0.8));
              };
              img.src = imageData;
            });
          };

          const webpDataUrl = await convertToWebP(imageUrl);

          setFormData((prev) => ({
            ...prev,
            profileImg: webpDataUrl,
          }));
          setMaxStep(Math.max(maxStep, 12));
          setStep(Math.max(maxStep, 12));
        } else {
          setFormData((prev) => ({
            ...prev,
            profileImg: null,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="signup">
      <div className="relative">
        {step >= 4 && (
          <button
            onClick={() => {
              if (step >= 9) {
                setStep(8);
              } else if (step >= 4) {
                setStep(3);
              }
            }}
            className={`
                w-6 aspect-square 
                flex items-center justify-center
                text-gray-600
                border border-gray-300 
                rounded-lg
                bg-white
                box-border
                transition-all duration-300 ease-in-out
                hover:bg-gray-100
                focus:outline-none focus:border-[#ff6842] focus:ring-2 focus:ring-[#4CAF50]/20
                absolute
                top-5 left-5
                z-10
              `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <Header step={step}>
          <div className="flex items-center relative w-full">
            <h1 className="w-full text-center text-xl font-semibold">
              {step >= 9
                ? "내 프로필 입력"
                : step >= 4
                ? "내 정보 입력"
                : "사주 정보 입력"}
            </h1>
          </div>
        </Header>
      </div>
      {renderStep()}
      <div className="button-group">
        {(step === 3 || step === 8) && (
          <button
            onClick={handleNextStep}
            disabled={step >= maxStep}
            className="w-full py-3 mt-3 bg-[#ff7070] text-white shadow rounded-md font-black font-NanumR"
          >
            다음
          </button>
        )}
        {step === 12 && (
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-[#ff7070] text-white rounded-md shadow"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className=" flex items-center justify-center">
                <div className="w-5 h-5 border-2  border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                처리중...
              </div>
            ) : (
              "가입하기"
            )}
          </button>
        )}
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-[#ff7070] border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-700">회원가입 처리중...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
