package com.saju.sajubackend.api.auth.service.kakao;

import com.saju.sajubackend.api.auth.dto.KakaoTokenResponse;
import com.saju.sajubackend.api.auth.dto.KakaoUserResponse;
import com.saju.sajubackend.api.auth.dto.LoginResponse;
import com.saju.sajubackend.api.auth.service.AuthService;
import com.saju.sajubackend.common.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoAuthService {
    private final WebClient webClient;
    private final AuthService authService;  // AuthService 주입
    private final JwtProvider jwtProvider;

    @Value("${oauth.kakao.client-id}")
    private String clientId;

    @Value("${oauth.kakao.redirect-uri}")
    private String redirectUri;

    public LoginResponse socialLogin(String code) {
        // 1. 인가코드로 액세스 토큰 요청
        KakaoTokenResponse tokenResponse = getKakaoAccessToken(code);
        log.info("✅ [카카오 인가코드 사용] 액세스 토큰 받음: {}", tokenResponse.getAccess_token());

        // 2. 액세스 토큰으로 카카오 사용자 정보 요청
        KakaoUserResponse userInfo = getKakaoUserInfo(tokenResponse.getAccess_token());
        log.info("✅ [카카오 사용자 정보 조회] 사용자 정보: {}", userInfo);

        // 3. 회원가입 및 로그인 처리
//        return processKakaoUser(userInfo);
        return authService.login(userInfo);
    }

    public KakaoTokenResponse getKakaoAccessToken(String code) {
        // 요청 전 로그 출력
        log.info("=== [카카오 토큰 요청] ===");
        log.info("Authorization Code: {}", code);
        log.info("Client ID: {}", clientId);
        log.info("Redirect URI: {}", redirectUri);

        try {
            KakaoTokenResponse response = webClient.post()
                    .uri("https://kauth.kakao.com/oauth/token")
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(BodyInserters.fromFormData("grant_type", "authorization_code")
                            .with("client_id", clientId)
                            .with("redirect_uri", redirectUri)
                            .with("code", code))
                    .retrieve()
                    .bodyToMono(KakaoTokenResponse.class)
                    .doOnSuccess(res -> log.info("카카오 응답 성공: {}", res))
                    .doOnError(error -> log.error("카카오 요청 실패: {}", error.getMessage()))
                    .block(); // 동기 실행 (비동기 사용 시 block() 제거)

            // 요청 후 응답 로그 출력
            log.info("=== [카카오 응답 완료] ===");
            return response;
        } catch (Exception e) {
            log.error("카카오 토큰 요청 중 예외 발생: {}", e.getMessage(), e);
            throw new RuntimeException("카카오 토큰 요청 실패", e);
        }
    }


    private KakaoUserResponse getKakaoUserInfo(String accessToken) {
        return webClient.get()
                .uri("https://kapi.kakao.com/v2/user/me") // 카카오 사용자 정보 요청 URL
                .headers(headers -> headers.setBearerAuth(accessToken)) // Bearer Token 설정
                .retrieve()
                .bodyToMono(KakaoUserResponse.class) // 응답을 KakaoUserResponse 클래스로 매핑
                .block(); // 동기 방식으로 실행 (비동기 방식 사용 시 block() 제거 가능)
    }


//    private LoginResponse processKakaoUser(KakaoUserResponse kakaoUserResponse) {
//        String email = kakaoUserResponse.getKakao_account().getEmail();
//
//        // 이메일로 기존 회원 확인
//        if (!authService.isExistingMember(email)) {
//            // 신규 회원인 경우 이메일만 반환
//            return LoginResponse.builder()
//                    .email(email)
//                    .build();
//        }
//
//        // 기존 회원인 경우 로그인 처리
//        return authService.login(email);
//    }
}
