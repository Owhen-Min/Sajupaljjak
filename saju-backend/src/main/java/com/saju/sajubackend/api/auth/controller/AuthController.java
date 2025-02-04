package com.saju.sajubackend.api.auth.controller;

import com.saju.sajubackend.api.auth.dto.LoginResponse;
import com.saju.sajubackend.api.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("api/auth")
@RestController
public class AuthController {

    private final AuthService authService;

    @GetMapping("/login/kakao")
    public ResponseEntity<LoginResponse> login(@RequestParam String code) {
        LoginResponse response = authService.kakaoLogin(code);
        return ResponseEntity.status(response.getStatus()).body(response);
    }


}
