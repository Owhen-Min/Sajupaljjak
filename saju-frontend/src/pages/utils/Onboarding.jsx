import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import Random from "../../assets/animations/heart.json";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/useApi";

function OnboardingPage() {
  const navigate = useNavigate();
  const {
    updateUser,
    updateMemberId,
    updateRelation,
    updateIsAuthenticated,
    updateAccessToken,
    logout,
  } = useAuth();

  const { mutateAsync: refreshTokenMutation } = usePost('/api/auth/access-token');

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      navigate('/auth');
      return;
    }

    const refreshAccessToken = async () => {
      try {
        const data = await refreshTokenMutation({ refreshToken });
        
        // 기존 데이터 초기화
        logout();
        
        // 새로운 데이터 저장
        const { token, ...userData } = data;
        
        localStorage.setItem("accessToken", token.accessToken);
        localStorage.setItem("refreshToken", token.refreshToken);
        localStorage.setItem("memberId", data.member_id);
        localStorage.setItem("relation", data.relation);
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Context 업데이트
        updateUser(userData);
        updateMemberId(data.member_id);
        updateRelation(data.relation);
        updateIsAuthenticated(true);
        updateAccessToken(token.accessToken);

        if (data.relation === null) {
          navigate('/auth/signup/additional');
          return;
        }
        // 관계 상태에 따른 페이지 이동
        navigate(data.relation === 'COUPLE' ? '/couple' : '/solo');
      } catch (error) {
        console.error('Token refresh failed:', error);
        navigate('/auth');
      }
    };

    refreshAccessToken();
  }, [navigate, updateUser, updateMemberId, updateRelation, updateIsAuthenticated, updateAccessToken, logout, refreshTokenMutation]);

 
  return (
    <div className="onboarding bg-gray-50 h-screen w-full">
      <div className="h-[70%] w-full flex items-center justify-center flex-col gap-y-3">
        <div style={{ width: 100, height: 100 }}>
          <Lottie animationData={Random} loop={true} />
        </div>
        <div className="font-NanumH text-[#ff7070] font-bold text-3xl">
          사주팔짝
        </div>
        <div className="font-NanumH text-[#ff7070] font-bold text-base">
          운명이 점지해준 단 한사람.
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;