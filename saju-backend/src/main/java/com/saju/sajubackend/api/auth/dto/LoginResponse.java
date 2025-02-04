package com.saju.sajubackend.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private int status;
    private KakaoUserResponse data;
    private KaKaoTokenResponse token;
}
