package com.saju.sajubackend.common.config;

import com.saju.sajubackend.common.jwt.resolver.CurrentMemberIdArgumentResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true); // 인증 정보(쿠키, 헤더) 포함 허용
        config.setAllowedOrigins(List.of("http://localhost:5173", "https://i12a408.p.ssafy.io")); // 허용할 프론트엔드 URL
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")); // 허용할 HTTP 메서드
        config.setAllowedHeaders(List.of("*")); // 모든 요청 헤더 허용

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new CurrentMemberIdArgumentResolver());
    }
}
