import React, { useState, useEffect } from "react";
import { TopBar2 } from "../../components/TopBar2";
import { useNavigate } from "react-router-dom";
import SelectionGrid from "../../components/SelectionGrid";
import Dropdown from "../../components/Dropdown";
import MainButton from "../../components/MainButton";
import Input from "../../components/Input";
import { provinces } from "../../data/provinceCode";
import { useGet, usePatch } from "../../hooks/useApi";
import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs';

function MyPageEditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profileImage: '',
    nickname: '',
    intro: '',
    religion: '',
    smoking: '',
    drinking: '',
    height: '',
    cityCode: '',
    dongCode: '',
  });
  const [model, setModel] = useState(null);
  const [faceDetectionError, setFaceDetectionError] = useState(false);

  const [errors, setErrors] = useState({
    profileImage: false,
    nickname: false,
    intro: false,
    religion: false,
    smoking: false,
    drinking: false,
    height: false,
    location: false,
  });

  const { data, isLoading, error } = useGet('/api/members');
  const mutation = usePatch('/api/members');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!data) return;

      console.log('Received data:', data); // 받은 데이터 로깅
      
      try {
        // cityCode와 dongCode가 있는지 확인하고, provinces 객체에서 유효한 값인지 검증
        const cityCode = data.cityCode || '';
        const dongCode = data.dongCode || '';
        
        // cityCode가 유효한지 확인
        const cityExists = Object.values(provinces).some(
          province => province.code === cityCode
        );

        console.log('Updated formData:', {
          ...data,
          cityCode: cityExists ? cityCode : '',
          dongCode: cityExists ? dongCode : '',
        }); // 업데이트될 formData 로깅
        
        setFormData({
          ...data,
          cityCode: cityExists ? cityCode : '',
          dongCode: cityExists ? dongCode : '',
        });
      } catch (error) {
        window.alert('프로필 데이터 로딩 실패:', error);
      }
    };

    fetchUserProfile();
  }, [data]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await blazeface.load();
        setModel(loadedModel);
      } catch (error) {
        console.error('얼굴 인식 모델 로딩 실패:', error);
      }
    };
    loadModel();
  }, []);

  const detectFace = async (imageUrl) => {
    if (!model) return false;

    const img = new Image();
    img.src = imageUrl;
    
    return new Promise((resolve) => {
      img.onload = async () => {
        try {
          const predictions = await model.estimateFaces(img, false);
          resolve(predictions.length > 0);
        } catch (error) {
          console.error('얼굴 인식 실패:', error);
          resolve(false);
        }
      };
    });
  };

  const handleImageUpload = async (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target.result;
        const hasFace = await detectFace(imageUrl);
        
        if (hasFace) {
          // WebP로 변환하는 함수
          const convertToWebP = (imageData) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement('canvas');
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
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                resolve(canvas.toDataURL('image/webp', 0.8));
              };
              img.src = imageData;
            });
          };

          // 이미지를 WebP로 변환
          const webpDataUrl = await convertToWebP(imageUrl);
          
          setFormData(prev => ({
            ...prev,
            profileImage: webpDataUrl
          }));
          setFaceDetectionError(false);
        } else {
          setFaceDetectionError(true);
          setFormData(prev => ({
            ...prev,
            profileImage: null
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 로딩 상태 표시 업데이트
  if (isLoading || mutation.isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-lg flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-[#ff7070] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-700">
            {isLoading ? "프로필 불러오는 중..." : "프로필 수정 중..."}
          </p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectionChange = (field, selected) => {
    setFormData(prev => ({
      ...prev,
      [field]: selected
    }));
  };

  const validateForm = () => {
    const newErrors = {
      profileImage: !formData.profileImage,
      nickname: !formData.nickname.trim(),
      intro: !formData.intro.trim(),
      religion: !formData.religion,
      smoking: !formData.smoking,
      drinking: !formData.drinking,
      height: !formData.height,
      location: !formData.cityCode || !formData.dongCode
    };

    // 프로필 이미지가 변경되었고 Base64 형식인 경우에만 검증
    if (formData.profileImage && formData.profileImage.startsWith('data:image')) {
      if (faceDetectionError) {
        return false;
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        let updatedProfileData = { ...formData };

        // 이미지 URL이 data:image 형식인 경우에만 이미지 업로드 진행
        if (formData.profileImage && formData.profileImage.startsWith('data:image')) {
          // Base64 이미지를 File 객체로 변환
          const imageFile = await fetch(formData.profileImage)
            .then(res => res.blob())
            .then(blob => {
              const uniqueFileName = `profile_${Date.now()}_${Math.random().toString(36).substring(7)}.webp`;
              return new File([blob], uniqueFileName, { type: 'image/webp' });
            });

          // 프리사인드 URL 요청
          const presignResponse = await mutation.mutateAsync({
            uri: '/api/image',
            payload: { filename: imageFile.name }
          });

          const { presignedUrl, objectKey } = presignResponse;

          // S3에 직접 이미지 업로드
          const uploadResponse = await fetch(presignedUrl, {
            method: 'PUT',
            headers: { 'Content-Type': imageFile.type },
            body: imageFile
          });

          if (!uploadResponse.ok) {
            throw new Error('S3 파일 업로드 실패');
          }

          // 업데이트 데이터에 S3 이미지 URL 추가
          updatedProfileData.profileImage = `https://saju-bucket.s3.amazonaws.com/${objectKey}`;
        }

        // 프로필 업데이트 API 호출
        await mutation.mutateAsync({
          uri: '/api/members',
          payload: updatedProfileData
        });

        navigate('/mypage');
      } catch (error) {
        console.error('프로필 업데이트 실패:', error);
        alert('프로필 업데이트에 실패했습니다.');
      }
    } else {
      alert('모든 항목을 올바르게 입력해주세요.');
    }
  };

  return (
    <div className="edit-profile-page flex flex-col relative pt-[60px] pb-5 min-h-screen">
      <TopBar2 mainText={"내 프로필 수정하기"} />
      <div className="flex-1 overflow-y-auto px-6 pt-2">
        {/* 프로필 사진 */}
        <div className="mb-5">
          {errors.profileImage && (
            <p className="text-red-500 text-sm mb-2">프로필 사진을 선택해주세요</p>
          )}
          {faceDetectionError && (
            <p className="text-red-500 text-sm mb-2">얼굴이 포함된 사진을 업로드해주세요</p>
          )}
          <div className="flex flex-col items-center">
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleImageUpload(file);
                }
              }}
              className="hidden"
              id="profileImageInput"
            />
            <label 
              htmlFor="profileImageInput"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full mb-4 flex items-center justify-center overflow-hidden hover:border-red-500 transition-colors">
                {formData.profileImage ? (
                  <img 
                    src={formData.profileImage} 
                    alt="프로필 미리보기" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">사진 추가</span>
                )}
              </div>
              <span className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                사진 변경하기
              </span>
            </label>
          </div>
        </div>

        {/* 닉네임 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">닉네임</h3>
          {errors.nickname && (
            <p className="text-red-500 text-sm mb-2">닉네임을 입력해주세요</p>
          )}
          <Input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange}
            placeholder="닉네임"
            className={`w-1/2 h-10 border rounded-md px-3 ${
              errors.nickname ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>

        {/* 자기소개 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">자기소개</h3>
          {errors.intro && (
            <p className="text-red-500 text-sm mb-2">자기소개를 입력해주세요</p>
          )}
          <textarea
            name="intro"
            value={formData.intro}
            onChange={handleInputChange}
            placeholder="자기소개를 입력해주세요"
            className={`w-full h-32 p-3 border rounded-md resize-none ${
              errors.intro ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={500}
          />
        </div>

        {/* 종교 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">종교</h3>
          {errors.religion && (
            <p className="text-red-500 text-sm mb-2">종교를 선택해주세요</p>
          )}
          <SelectionGrid
            cols={3}
            options={['무교', '개신교', '불교', '천주교', '기타']}
            onSelect={(selected) => handleSelectionChange('religion', selected)}
            selected={formData.religion ? [[['무교', '개신교', '불교', '천주교', '기타'].indexOf(formData.religion)]] : []}
          />
        </div>

        {/* 흡연 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">흡연</h3>
          {errors.smoking && (
            <p className="text-red-500 text-sm mb-2">흡연 여부를 선택해주세요</p>
          )}
          <SelectionGrid
            cols={3}
            options={['비흡연', '흡연', '금연 중']}
            onSelect={(selected) => handleSelectionChange('smoking', selected)}
            selected={formData.smoking ? [[['비흡연', '흡연', '금연 중'].indexOf(formData.smoking)]] : []}
          />
        </div>

        {/* 음주 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">음주</h3>
          {errors.drinking && (
            <p className="text-red-500 text-sm mb-2">음주 여부를 선택해주세요</p>
          )}
          <SelectionGrid
            cols={2}
            options={['음주 안함', '주 1~2회', '주 3~4회', '주 5회 이상']}
            onSelect={(selected) => handleSelectionChange('drinking', selected)}
            selected={formData.drinking ? [[['음주 안함', '주 1~2회', '주 3~4회', '주 5회 이상'].indexOf(formData.drinking)]] : []}
          />
        </div>

        {/* 키 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">키</h3>
          {errors.height && (
            <p className="text-red-500 text-sm mb-2">키를 선택해주세요</p>
          )}
          <select
            name="height"
            value={formData.height || "170"}
            onChange={handleInputChange}
            className="w-full h-10 border border-gray-300 rounded-md px-3"
          >
            {Array.from({ length: 81 }, (_, i) => i + 140).map(height => (
              <option key={height} value={height}>{height}cm</option>
            ))}
          </select>
        </div>

        {/* 거주지 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">거주지</h3>
          {errors.location && (
            <p className="text-red-500 text-sm mb-2">거주지를 선택해주세요</p>
          )}
          <div className="flex gap-2">
            <Dropdown
              name="cityCode"
              value={formData.cityCode}
              onChange={(e) => {
                setFormData(prev => ({ 
                  ...prev, 
                  cityCode: e.target.value,
                  dongCode: '' 
                }));
              }}
              placeholder="시/도 선택"
              options={Object.entries(provinces).map(([key, value]) => ({
                value: value.code,
                label: key
              }))}
              className="flex-1 w-2/3"
            />
            {formData.cityCode && (
                  <Dropdown
                    name="dongCode"
                    value={formData.dongCode}
                    onChange={(e) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        dongCode: e.target.value
                      }));
                    }}
                    placeholder="구/군 선택"
                    options={(() => {
                      const selectedSi = Object.keys(provinces).find(
                        key => provinces[key].code === formData.cityCode
                      );
                      if (!selectedSi) return [];
                      
                      return Object.entries(provinces[selectedSi].sigungu).map(([district, code]) => ({
                        value: code,
                        label: district.replace(selectedSi, '').trim()
                      }));
                    })()}
                    className="flex-1 w-1/3"
                  />
                )}
          </div>
        </div>

        {/* 저장 버튼 */}
        <MainButton 
          onClick={handleSubmit}
          className="w-full py-3 mt-4"
        >
          수정하기
        </MainButton>
      </div>
    </div>
  );
}

export default MyPageEditProfile;
