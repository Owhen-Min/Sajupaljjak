package com.saju.sajubackend.common.util;

import com.saju.sajubackend.api.matching.dto.MatchingMemberResponseDto;
import com.saju.sajubackend.api.matching.dto.MatchingWrapper;
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

    public List<MatchingMemberResponseDto> getCache(Long memberId) {
        Object cachedData = redisTemplate.opsForValue().get(getRedisKey(memberId));

        if (cachedData == null) return Collections.emptyList();

        if (cachedData instanceof MatchingWrapper wrapper) {
            return wrapper.getMembers();
        }

        return Collections.emptyList();
    }


    public void createCache(Long memberId, List<MatchingMemberResponseDto> matchingMembers) {
        LocalDateTime midnight = LocalDate.now().plusDays(1).atStartOfDay();
        long secondsUntilMidnight = ChronoUnit.SECONDS.between(LocalDateTime.now(), midnight);

        MatchingWrapper wrapper = new MatchingWrapper(matchingMembers);
        redisTemplate.opsForValue().set(getRedisKey(memberId), wrapper, secondsUntilMidnight, TimeUnit.SECONDS);
    }

    private String getRedisKey(Long memberId) {
        return "matching:" + memberId;
    }

}
