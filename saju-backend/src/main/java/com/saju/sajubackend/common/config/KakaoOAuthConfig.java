package com.saju.sajubackend.common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@RequiredArgsConstructor
public class KakaoOAuthConfig {

    @Value("${oauth.kakao.client-id}")
    private String clientId;

    @Value("${oauth.kakao.redirect-uri}")
    private String redirectUri;

//    @Value("${oauth.kakao.client-secret}")
//    private String clientSecret;

    @Bean
    public WebClient webClient() {
        return WebClient.builder().build();
    }
}