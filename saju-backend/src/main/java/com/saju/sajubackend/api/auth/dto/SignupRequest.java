package com.saju.sajubackend.api.auth.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SignupRequest {
    private String email;
    private int age;
    private String name;
    private String gender;
    private String bday;
    private String btime;
    private Boolean birthTimeUnknown;
    private String religion;
    private String smoking;
    private String drinking;
    private Integer height;
    private Integer cityCode;
    private Integer dongCode;
    private String profileImg;
    private String nickname;
    private String intro;
    private String relation;
}
