package com.saju.sajubackend.api.auth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.saju.sajubackend.common.enums.RelationshipStatus;
import com.saju.sajubackend.common.enums.Religion;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@Builder
public class LoginResponse {
    private Long member_id;
    private String name;
    private String email;
    private String nickname;
    private String relation;
    private String profile_img;
    private long cityCode;
    private String religion;
    private int age;
    private String celestial_stem_id;
    private String intro;
    private TokenInfo token;

    public static LoginResponse ofFailure(String email) {
        LoginResponse loginResponse = new LoginResponse();

        loginResponse.email = email;
        return loginResponse;
    }

    // 성공시 응답 속성 싹 다 받기
    public static LoginResponse ofSuccess(Long memberId, String name, String nickname, String relation, String profile_img, long cityCode, String religion, int age,
                                          String celestial_stem_id,String intro, TokenInfo token) {
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.member_id = memberId;
        loginResponse.name = name;
        loginResponse.nickname = nickname;
        loginResponse.relation = relation;
        loginResponse.profile_img = profile_img;
        loginResponse.cityCode = cityCode;
        loginResponse.religion = religion;
        loginResponse.age = age;
        loginResponse.celestial_stem_id=celestial_stem_id;
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