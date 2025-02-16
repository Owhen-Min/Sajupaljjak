package com.saju.sajubackend.api.auth.controller;

import com.saju.sajubackend.api.auth.dto.LoginResponse;
import com.saju.sajubackend.api.auth.dto.SignupRequest;
import com.saju.sajubackend.api.auth.service.AuthService;
import com.saju.sajubackend.api.auth.service.kakao.KakaoAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin(origins = "https://i12a408.p.ssafy.io")
public class AuthController {

    private final KakaoAuthService kakaoAuthService;
    private final AuthService authService;


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
}
