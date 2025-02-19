package com.saju.sajubackend.common.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.saju.sajubackend.api.matching.dto.MatchingMemberResponseDto;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MatchingRedisUtil {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public List<MatchingMemberResponseDto> getCache(Long memberId) {

        String key = getRedisKey(memberId);

        try {
            List<MatchingMemberResponseDto> matchingMembers =
                    objectMapper.convertValue(
                            redisTemplate.opsForValue().get(key),
                            new TypeReference<List<MatchingMemberResponseDto>>() {
                            }
                    );

            return matchingMembers;

        } catch (Exception e) {
            return null;
        }
    }


    public void createCache(Long memberId, List<MatchingMemberResponseDto> matchingMembers) {
        // 캐싱 시간 설정
        LocalDateTime midnight = LocalDate.now().plusDays(1).atStartOfDay();
        long secondsUntilMidnight = ChronoUnit.SECONDS.between(LocalDateTime.now(), midnight);

        redisTemplate.opsForValue().set(getRedisKey(memberId), matchingMembers, secondsUntilMidnight, TimeUnit.SECONDS);
    }

    private String getRedisKey(Long memberId) {
        return "matching:" + memberId;
    }

}
