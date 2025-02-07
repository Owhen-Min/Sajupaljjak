package com.saju.sajubackend.api.matching.service;

import com.saju.sajubackend.api.matching.dto.MemberListResponseDto;
import com.saju.sajubackend.api.matching.repository.MatchingPaginationRepository;
import com.saju.sajubackend.api.matching.repository.MatchingQueryDslRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.util.MatchingRedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MatchingService {

    private final MatchingRedisUtil matchingRedisUtil;
    private final MatchingQueryDslRepository matchingQueryDslRepository;
    private final MatchingPaginationRepository matchingPaginationRepository;

    private final int MAGINOT_SCORE = 80;
    private final int MEMBER_COUNT = 3;

    public List<MemberListResponseDto> getMatchingMembers(Long memberId) {

        // 1. redis에 이미 존재하는지 확인
        List<MemberListResponseDto> response = matchingRedisUtil.getCache(memberId);
        if (!response.isEmpty()) return response;

        // 2. 랜덤으로 3명 가져오기
        Map<Member, Integer> matchingMembers = matchingQueryDslRepository.findMatchingMembers(memberId, MAGINOT_SCORE, MEMBER_COUNT);

        response = matchingMembers.entrySet().stream()
                .map(entry -> MemberListResponseDto.fromEntity(entry.getKey(), entry.getValue().longValue()))
                .toList();

        matchingRedisUtil.createCache(memberId, response);
        return response;
    }

    public List<MemberListResponseDto> getMembers(Long memberId, Integer cursor) {
        Map<Member, Integer> members = matchingPaginationRepository.findMembers(memberId, cursor);
        return members.entrySet().stream()
                .map(entry -> MemberListResponseDto.fromEntity(entry.getKey(), entry.getValue()))
                .toList();
    }
}
