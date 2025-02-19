package com.saju.sajubackend.api.filter.dto;

import lombok.Getter;

@Getter
public class SajuUpdateRequest {
    private String birthYear;
    private String birthMonth;
    private String birthDay;
    private String birthHour;
    private String birthMinute;
}
