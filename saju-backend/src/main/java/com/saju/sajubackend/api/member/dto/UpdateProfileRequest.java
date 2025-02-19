package com.saju.sajubackend.api.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
    private String nickname;
    private String intro;
    private String religion;
    private String smoking;
    private String drinking;
    private Integer height;
    private String cityCode;
}
