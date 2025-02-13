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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

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

        System.out.println("인가코드로 액세스 토큰 요청 후"+tokenResponse.getAccess_token());

        // 2. 액세스 토큰으로 카카오 사용자 정보 요청
        KakaoUserResponse userInfo = getKakaoUserInfo(tokenResponse.getAccess_token());

        // 3. 회원가입 및 로그인 처리
        return processKakaoUser(userInfo);
    }

    private KakaoTokenResponse getKakaoAccessToken(String code) {
        System.out.println("\n====================== [OAuth 요청 시작] ======================");
        System.out.println("[STEP 1] 프론트엔드에서 받은 Authorization Code: " + code);
        System.out.println("[STEP 2] 요청 대상 URL: https://kauth.kakao.com/oauth/token");
        System.out.println("[STEP 3] 요청 파라미터:");
        System.out.println("         - client_id: " + clientId);
        System.out.println("         - redirect_uri: " + redirectUri);
        System.out.println("         - grant_type: authorization_code");
        System.out.println("         - code: " + code);
        System.out.println("==============================================================\n");

        return webClient.post()
                .uri("https://kauth.kakao.com/oauth/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData("grant_type", "authorization_code")
                        .with("client_id", clientId)
                        .with("redirect_uri", redirectUri)
                        .with("code", code))
                .retrieve()
                .bodyToMono(KakaoTokenResponse.class)
                .doOnRequest(n -> System.out.println("\n✅ [STEP 4] Kakao API에 요청 전송..."))
                .doOnNext(response -> {
                    System.out.println("\n🎉 [STEP 5] 토큰 수신 성공!");
                    System.out.println("[STEP 6] Kakao Access Token: " + response.getAccess_token());
                    System.out.println("[STEP 7] Kakao Refresh Token: " + response.getRefresh_token());
                    System.out.println("\n====================== [OAuth 요청 종료] ======================\n");
                })
                .doOnError(error -> {
                    System.out.println("\n❌ [STEP 5] Kakao API 요청 실패!");
                    System.out.println("     - 에러 메시지: " + error.getMessage());
                    System.out.println("     - 원인: " + (error instanceof WebClientResponseException.BadRequest ? "400 Bad Request (인가 코드 재사용/만료)" : "기타 오류"));
                    System.out.println("\n====================== [OAuth 요청 종료] ======================\n");
                })
                .block(); // 동기 실행 (비동기 사용 시 block() 제거)
    }


    private KakaoUserResponse getKakaoUserInfo(String accessToken) {
        System.out.println("카카오 사용자 정보 요청 하기~~~~");
        return webClient.get()
                .uri("https://kapi.kakao.com/v2/user/me") // 카카오 사용자 정보 요청 URL
                .headers(headers -> headers.setBearerAuth(accessToken)) // Bearer Token 설정
                .retrieve()
                .bodyToMono(KakaoUserResponse.class) // 응답을 KakaoUserResponse 클래스로 매핑
                .block(); // 동기 방식으로 실행 (비동기 방식 사용 시 block() 제거 가능)
    }


    private LoginResponse processKakaoUser(KakaoUserResponse kakaoUserResponse) {
        String email = kakaoUserResponse.getKakao_account().getEmail();

        // 이메일로 기존 회원 확인
        if (!authService.isExistingMember(email)) {
            // 신규 회원인 경우 이메일만 반환
            return LoginResponse.builder()
                    .email(email)
                    .build();
        }

        // 기존 회원인 경우 로그인 처리
        return authService.login(email);
    }
}