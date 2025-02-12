package com.saju.sajubackend.api.filter.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberProfileResponse {
    private String name;
    private String nickname;
    private String gender;
    private String profileImage;
    private int cityCode;
    private String religion;
    private int age;
    private int height;
    private String celestialStem;
    private String intro;
}