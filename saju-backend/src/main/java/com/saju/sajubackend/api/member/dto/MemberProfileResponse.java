package com.saju.sajubackend.api.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberProfileResponse {
    private String name;
    private String nickname;
    private String gender;
    private String profileImage;
    private String dongCode;
    private String cityCode;
    private String religion;
    private int age;
    private int height;
    private String celestialStem;
    private String intro;
    private String smoking;
    private String drinking;
    private String bday;
    private String btime;
}