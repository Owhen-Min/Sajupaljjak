package com.saju.sajubackend.common.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class WebClientConfig {

//    @Value("${openai.api-key}")
//    private String openAiApiKey;
//
//    @Bean
//    public WebClient webClient() {
//        return WebClient.builder()
//                .baseUrl("https://api.openai.com/v1")
//                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + openAiApiKey) // openAiApiKey는 필요에 따라 주입
//                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//                .build();
//    }
}
