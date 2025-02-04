package com.saju.sajubackend.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class KaKaoTokenResponse {
    private String accessToken;
    private String refreshToken;
}
