package com.saju.sajubackend.api.auth.service;
import com.saju.sajubackend.api.auth.dto.KakaoUserResponse;
import com.saju.sajubackend.api.auth.dto.LoginResponse;
import com.saju.sajubackend.api.auth.dto.KaKaoTokenResponse;
import com.saju.sajubackend.api.auth.util.JwtProvider;
import com.saju.sajubackend.api.auth.util.KakaoApiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AuthService {

    private final KakaoApiClient kakaoApiClient;
    private final JwtProvider jwtProvider;

    @Transactional
    public LoginResponse kakaoLogin(String code) {
        // 1. 카카오 OAuth 토큰 요청
        String accessToken = kakaoApiClient.getAccessToken(code);

        // 2. 카카오 사용자 정보 조회
        KakaoUserResponse kakaoUser = kakaoApiClient.getUserInfo(accessToken);

        // 3. JWT 토큰 발급
        KaKaoTokenResponse tokenResponse = jwtProvider.generateTokens(kakaoUser.getEmail());

        // 4. 로그인 응답 반환
        return new LoginResponse(200, kakaoUser, tokenResponse);
    }
}
