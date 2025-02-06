package com.saju.sajubackend.api.auth.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Getter
@Setter
public class KakaoUserResponse {
    private Long id;
    private Properties properties;
    private KakaoAccount kakao_account;

    @Getter
    @NoArgsConstructor
    public static class Properties {
        private String nickname;
        private String profile_image;
    }

    @Getter
    @NoArgsConstructor
    public static class KakaoAccount {
        private String email;
        private Profile profile;
        private String gender;
        private String name;

        @Getter
        @NoArgsConstructor
        public static class Profile {
            private String nickname;
            private String profile_image_url;
        }
    }
}