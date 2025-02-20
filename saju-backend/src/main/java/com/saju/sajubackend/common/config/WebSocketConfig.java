package com.saju.sajubackend.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 1. 일반 WebSocket 지원
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*"); // CORS 허용

        // 2. SockJS 지원
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // 백엔드 -> 프론트 주소 (프론트에서 구독할 주소)
        registry.setApplicationDestinationPrefixes("/app", "/topic"); // 프론트 -> 백엔드 주소 (프론트에서 요청 보낼 주소)
    }
}
