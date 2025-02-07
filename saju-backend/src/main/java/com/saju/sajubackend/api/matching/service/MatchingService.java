package com.saju.sajubackend.api.matching.service;

import com.saju.sajubackend.api.matching.dto.MemberListResponseDto;
import com.saju.sajubackend.api.matching.repository.MatchingQueryDslRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.saju.repository.ScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MatchingService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final MatchingQueryDslRepository matchingQueryDslRepository;
    private final ScoreRepository scoreRepository;

    private final int MAGINOT_SCORE = 80;
    private final int COUNT = 3;

    public List<MemberListResponseDto> getMatchingMembers(Long memberId) {
        // 1. redis에 이미 존재하는지 확인
        List<MemberListResponseDto> response = getCache(memberId);
        if (!response.isEmpty()) return response;

        // 2. 랜덤으로 3명 가져오기
        Map<Member, Long> matchingMembers = matchingQueryDslRepository.findMatchingMembers(memberId, MAGINOT_SCORE, COUNT);

        response = matchingMembers.entrySet().stream()
                .map(entry -> MemberListResponseDto.fromEntity(entry.getKey(), entry.getValue().longValue()))
                .toList();

        createCache(memberId, response);
        return response;
    }

    private List<MemberListResponseDto> getCache(Long memberId) {
        Object cachedData = redisTemplate.opsForValue().get(getRedisKey(memberId));
        if (cachedData instanceof List<?>) {
            return (List<MemberListResponseDto>) cachedData;
        }
        return Collections.emptyList();
    }

    private void createCache(Long memberId, List<MemberListResponseDto> matchingMembers) {
        LocalDateTime midnight = LocalDate.now().plusDays(1).atStartOfDay();
        long secondsUntilMidnight = ChronoUnit.SECONDS.between(LocalDateTime.now(), midnight);

        redisTemplate.opsForValue().set(getRedisKey(memberId), matchingMembers, secondsUntilMidnight, TimeUnit.SECONDS);
    }

    private String getRedisKey(Long memberId) {
        return "matching:" + memberId;
    }
}
