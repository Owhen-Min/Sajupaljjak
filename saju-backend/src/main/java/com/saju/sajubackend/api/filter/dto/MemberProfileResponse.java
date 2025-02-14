package com.saju.sajubackend.api.filter.dto;

import com.saju.sajubackend.common.enums.DrinkingFrequency;
import com.saju.sajubackend.common.enums.Gender;
import com.saju.sajubackend.common.enums.Religion;
import com.saju.sajubackend.common.enums.SmokingStatus;
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
    private int dongCode;
    private String religion;
    private int age;
    private int height;
    private String celestialStem;
    private String intro;
    private String smoking;
    private String drinking;
}