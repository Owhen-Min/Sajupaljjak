package com.saju.sajubackend.common.util;

import com.saju.sajubackend.api.matching.dto.MemberListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class MatchingRedisUtil {

    private final RedisTemplate<String, Object> redisTemplate;

    public List<MemberListResponseDto> getCache(Long memberId) {
        Object cachedData = redisTemplate.opsForValue().get(getRedisKey(memberId));
        if (cachedData instanceof List<?>) {
            return (List<MemberListResponseDto>) cachedData;
        }
        return Collections.emptyList();
    }

    public void createCache(Long memberId, List<MemberListResponseDto> matchingMembers) {
        LocalDateTime midnight = LocalDate.now().plusDays(1).atStartOfDay();
        long secondsUntilMidnight = ChronoUnit.SECONDS.between(LocalDateTime.now(), midnight);

        redisTemplate.opsForValue().set(getRedisKey(memberId), matchingMembers, secondsUntilMidnight, TimeUnit.SECONDS);
    }

    private String getRedisKey(Long memberId) {
        return "matching:" + memberId;
    }

}
