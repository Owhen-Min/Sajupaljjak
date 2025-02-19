package com.saju.sajubackend.api.auth.controller;

import com.saju.sajubackend.api.auth.dto.LoginResponse;
import com.saju.sajubackend.api.auth.dto.SignupRequest;
import com.saju.sajubackend.api.auth.service.AuthService;
import com.saju.sajubackend.api.auth.service.RefreshTokenService;
import com.saju.sajubackend.api.auth.service.kakao.KakaoAuthService;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.token.RefreshToken;
import com.saju.sajubackend.common.enums.RelationshipStatus;
import com.saju.sajubackend.common.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"https://i12a408.p.ssafy.io", "http://localhost:5173"})
public class AuthController {

    private final KakaoAuthService kakaoAuthService;
    private final AuthService authService;
    private final JwtProvider jwtProvider;
    private final RefreshTokenService refreshTokenService;
    private final MemberRepository memberRepository;


    @GetMapping("/login/kakao")
    public ResponseEntity<LoginResponse> kakaoLogin(@RequestParam String code) {
        log.info("✅ [AuthController] : {}", code);
        LoginResponse loginResponse = kakaoAuthService.socialLogin(code);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        LoginResponse response = authService.signup(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> checkNickname(@RequestParam String nickname) {
        if (!isValidNickname(nickname)) {
            return ResponseEntity.badRequest()
                    .body("닉네임은 2-20자의 한글, 영문, 숫자만 사용 가능합니다");
        }

        boolean isAvailable = authService.checkNicknameAvailability(nickname);
        if (!isAvailable) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("이미 존재하는 닉네임입니다");
        }

        return ResponseEntity.ok("사용 가능한 닉네임입니다");
    }

    private boolean isValidNickname(String nickname) {
        return nickname != null &&
                nickname.length() >= 2 &&
                nickname.length() <= 20 &&
                nickname.matches("^[가-힣a-zA-Z0-9]+$");
    }

    @PostMapping("/access-token")
    public ResponseEntity<?> refreshAccessToken(@RequestHeader("Authorization") String token) {
        //클라이언트가 보낸 리프레시 토큰 추출
        String refreshToken = token.replace("Bearer ", "");

        //리프레시 토큰 유효성 검사
        if (!jwtProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }

        //토큰에서 사용자 ID 추출
        long memberId = jwtProvider.getUserIdFromToken(refreshToken);

        //DB에서 해당 사용자의 리프레시 토큰 가져오기
        RefreshToken storedToken = refreshTokenService.getRefreshToken(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token not found"));

        //리프레시 토큰 비교
        if (!storedToken.getRefreshToken().equals(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token mismatch");
        }

        //새로운 액세스 토큰 생성
        String newAccessToken = jwtProvider.createAccessToken(memberId);

        //사용자의 관계 상태(relation) 가져오기
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        RelationshipStatus relation = member.getRelation(); // 관계 상태 가져오기

        //응답 DTO 생성
        LoginResponse.TokenInfo tokenInfo = LoginResponse.TokenInfo.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken) // 필요하면 포함
                .build();

        LoginResponse loginResponse = LoginResponse.builder()
                .member_id(memberId)
                .relation(relation) // 🔹 관계 상태 포함
                .token(tokenInfo)
                .build();

        return ResponseEntity.ok(loginResponse);
    }
}
