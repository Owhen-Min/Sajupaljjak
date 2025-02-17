package com.saju.sajubackend.api.matching.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.saju.sajubackend.common.enums.CelestialStem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MatchingProfileResponseDto {

    @JsonProperty("id")
    private long memberId;

    private String nickname;

    private int score;

    @JsonProperty("profileImage")
    private String profileImg;

    private String cityCode;

    private int age;

    private CelestialStem celestialStem;

    @JsonProperty("introduction")
    private String intro;

    @JsonProperty("year")
    private String yearly;

    @JsonProperty("month")
    private String monthly;

    @JsonProperty("day")
    private String daily;

    @JsonProperty("time")
    private String timely;

    private String harmony;

    private String chemi;

    private String good;

    private String bad;

    private String advice;
}

