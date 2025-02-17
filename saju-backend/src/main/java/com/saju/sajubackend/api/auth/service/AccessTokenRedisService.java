package com.saju.sajubackend.api.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Service
public class AccessTokenRedisService {
    private final StringRedisTemplate redisTemplate;

    //액세스 토큰을 Redis에 저장
    public void saveAccessToken(Long memberId, String token, long expirationTime) {
        redisTemplate.opsForValue().set(
                "ACCESS_TOKEN:" + memberId,
                token,
                expirationTime,
                TimeUnit.MILLISECONDS
        );
    }

    //Redis에서 액세스 토큰 조회
    public String getAccessToken(Long memberId) {
        return redisTemplate.opsForValue().get("ACCESS_TOKEN:" + memberId);
    }

    //Redis에서 액세스 토큰 삭제
    public void deleteAccessToken(Long memberId) {
        redisTemplate.delete("ACCESS_TOKEN:" + memberId);
    }
}
