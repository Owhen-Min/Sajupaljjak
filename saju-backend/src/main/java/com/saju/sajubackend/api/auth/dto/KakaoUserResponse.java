package com.saju.sajubackend.api.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoUserResponse {
    private String email;
    private String name;
    private String nickname;
    private String profileImage;
    private int cityCode;
    private String religion;
    private int age;
    private String celestial_stem_id;
    private String introduction;
}
