package com.saju.sajubackend.common.util;

import com.saju.sajubackend.api.matching.dto.MatchingMemberResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class MatchingRedisUtil {

    private final RedisTemplate<String, Object> redisTemplate;

    public List<MatchingMemberResponseDto> getCache(Long memberId) {
        Object cachedData = redisTemplate.opsForValue().get(getRedisKey(memberId));

        if (cachedData == null) return Collections.emptyList();

        if (cachedData instanceof List<?>) {
            try {
                return ((List<?>) cachedData).stream()
                        .filter(obj -> obj instanceof MatchingMemberResponseDto)
                        .map(obj -> (MatchingMemberResponseDto) obj)
                        .collect(Collectors.toList());
            } catch (ClassCastException e) {
                return Collections.emptyList();
            }
        }

        return Collections.emptyList();
    }


    public void createCache(Long memberId, List<MatchingMemberResponseDto> matchingMembers) {
        LocalDateTime midnight = LocalDate.now().plusDays(1).atStartOfDay();
        long secondsUntilMidnight = ChronoUnit.SECONDS.between(LocalDateTime.now(), midnight);

        redisTemplate.opsForValue().set(getRedisKey(memberId), matchingMembers, secondsUntilMidnight, TimeUnit.SECONDS);
    }

    private String getRedisKey(Long memberId) {
        return "matching:" + memberId;
    }

}
