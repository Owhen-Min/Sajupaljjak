package com.saju.sajubackend.api.auth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.saju.sajubackend.common.enums.Religion;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@Builder
public class LoginResponse {
    private String email;
    private String nickname;
    private String profile_img;
    private int cityCode;
    private Religion religion;
    private int age;
    //    private int celestial_stem_id;
    private String intro;
    private TokenInfo token;

    public static LoginResponse ofFailure(String email) {
        LoginResponse loginResponse = new LoginResponse();

        loginResponse.email = email;
        return loginResponse;
    }

    // 성공시 응답 속성 싹 다 받기
    public static LoginResponse ofSuccess(String nickname, String profile_img, int cityCode, Religion religion, int age,
                                          String intro, TokenInfo token) {
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.nickname = nickname;
        loginResponse.profile_img = profile_img;
        loginResponse.cityCode = cityCode;
        loginResponse.religion = religion;
        loginResponse.age = age;
//        loginResponse.celestial_stem_id=celestial_stem_id;
        loginResponse.intro = intro;
        loginResponse.token = token;
        return loginResponse;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class TokenInfo {
        private String accessToken;
        private String refreshToken;
    }
}