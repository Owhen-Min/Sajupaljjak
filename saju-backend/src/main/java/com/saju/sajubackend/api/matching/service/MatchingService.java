package com.saju.sajubackend.api.matching.service;

import com.saju.sajubackend.api.matching.repository.MatchingQueryDslRepository;
import com.saju.sajubackend.api.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MatchingService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final MatchingQueryDslRepository matchingQueryDslRepository;

    private final int MAGINOT_SCORE = 80;

    public List<Member> getMatchingMembers(Long memberId) {
        // 1. redis에 이미 존재하는지 확인
        if (redisTemplate.hasKey(String.valueOf(memberId))) return getCache(memberId);

        // 2. 랜덤으로 3명 가져오기
        List<Member> matchingMembers = matchingQueryDslRepository.findMatchingMembers(memberId, MAGINOT_SCORE);
        createCache(memberId, matchingMembers);
        return matchingMembers;
    }

    private List<Member> getCache(Long memberId) {
        Object cachedData = redisTemplate.opsForValue().get(getRedisKey(memberId));
        if (cachedData instanceof List<?>) {
            return (List<Member>) cachedData;
        }
        return Collections.emptyList();
    }

    private void createCache(Long memberId, List<Member> matchingMembers) {
        LocalDateTime midnight = LocalDate.now().plusDays(1).atStartOfDay();
        long secondsUntilMidnight = ChronoUnit.SECONDS.between(LocalDateTime.now(), midnight);

        redisTemplate.opsForValue().set(getRedisKey(memberId), matchingMembers, secondsUntilMidnight, TimeUnit.SECONDS);
    }

    private String getRedisKey(Long memberId) {
        return "matching:" + memberId;
    }
}
