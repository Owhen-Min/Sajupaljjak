package com.saju.sajubackend.api.matching.service;

import com.saju.sajubackend.api.matching.repository.MatchingQueryDslRepository;
import com.saju.sajubackend.api.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MatchingService {

    private final MatchingQueryDslRepository matchingQueryDslRepository;

    private final int MAGINOT_SCORE = 80;

    public List<Member> getMatchingMembers(Long memberId) {
        // todo : redis에 이미 존재하는지 확인

        // 2. 랜덤으로 3명 가져오기
        return matchingQueryDslRepository.findMatchingMembers(memberId, MAGINOT_SCORE);
    }
}
