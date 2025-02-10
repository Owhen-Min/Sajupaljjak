package com.saju.sajubackend.api.matching.service;

import com.saju.sajubackend.api.couple.domain.CoupleYear;
import com.saju.sajubackend.api.couple.repository.CoupleYearRepository;
import com.saju.sajubackend.api.matching.dto.MatchingMemberDetialResponseDto;
import com.saju.sajubackend.api.matching.dto.MatchingMemberResponseDto;
import com.saju.sajubackend.api.matching.dto.MemberListResponseDto;
import com.saju.sajubackend.api.matching.repository.MatchingPaginationRepository;
import com.saju.sajubackend.api.matching.repository.MatchingQueryDslRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.saju.domain.Saju;
import com.saju.sajubackend.api.saju.domain.Score;
import com.saju.sajubackend.api.saju.repository.SajuRepository;
import com.saju.sajubackend.api.saju.repository.ScoreRepository;
import com.saju.sajubackend.common.enums.Gender;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.NotFoundException;
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
    private final MemberRepository memberRepository;
    private final ScoreRepository scoreRepository;
    private final SajuRepository sajuRepository;
    private final CoupleYearRepository coupleYearRepository;

    private final int MAGINOT_SCORE = 80;
    private final int MEMBER_COUNT = 3;
    private final int PAGE_SIZE = 20;

    public List<MatchingMemberResponseDto> getMatchingMembers(Long memberId) {

        // 1. redis에 이미 존재하는지 확인
        List<MatchingMemberResponseDto> response = matchingRedisUtil.getCache(memberId);
        if (!response.isEmpty()) return response;

        // 2. 랜덤으로 3명 가져오기
        Map<Member, Integer> matchingMembers = matchingQueryDslRepository.findMatchingMembers(memberId, MAGINOT_SCORE, MEMBER_COUNT);

        response = matchingMembers.entrySet().stream()
                .map(entry -> MatchingMemberResponseDto.fromEntity(entry.getKey(), entry.getValue()))
                .toList();

        matchingRedisUtil.createCache(memberId, response);
        return response;
    }

    public MemberListResponseDto getMembers(Long memberId, Integer cursor) {
        Map<Member, Integer> members = matchingPaginationRepository.findMembers(memberId, cursor, PAGE_SIZE + 1); // hasNext인지 확인하기 위해 pageSize보다 1개 더 가져옴
        return MemberListResponseDto.fromEntity(members);
    }

    public MatchingMemberDetialResponseDto getMatchingMemberProfile(Long memberId, Long partnerId) {
        // 1. 회원 정보
        Member loginMember = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));
        Member matchingMember = memberRepository.findById(partnerId).orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));

        // 2. 매칭 회원과 궁합 점수
        Integer score = scoreRepository.findBySourceAndTarget(loginMember.getCelestialStem(), matchingMember.getCelestialStem())
                .map(Score::getScore)
                .orElse(0);

        // 3. 멤버의 만세력
        Saju loginMemberSaju = sajuRepository.findByMember(loginMember).orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));
        Saju matchingMemberSaju = sajuRepository.findByMember(loginMember).orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));

        // 4. 매칭 멤버와 궁합 리포트
        CoupleYear coupleYear;

        if (loginMember.getGender().getCode() == Gender.MALE.getCode()) {
            coupleYear = coupleYearRepository.findByMaleAndFemale(loginMemberSaju.getDaily(), matchingMemberSaju.getDaily())
                    .orElseThrow(() -> new BadRequestException(ErrorMessage.COUPLE_YEAR_NOT_FOUND));
        } else {
            coupleYear = coupleYearRepository.findByMaleAndFemale(matchingMemberSaju.getDaily(), loginMemberSaju.getDaily())
                    .orElseThrow(() -> new BadRequestException(ErrorMessage.COUPLE_YEAR_NOT_FOUND));
        }
        return MatchingMemberDetialResponseDto.fromEntity(matchingMember, score, matchingMemberSaju, coupleYear);
    }
}
