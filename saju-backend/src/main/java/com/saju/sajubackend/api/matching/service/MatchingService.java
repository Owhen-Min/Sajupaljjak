package com.saju.sajubackend.api.matching.service;

import com.saju.sajubackend.api.matching.dto.MatchingMemberResponseDto;
import com.saju.sajubackend.api.matching.dto.MatchingProfileResponseDto;
import com.saju.sajubackend.api.matching.dto.MemberListResponseDto;
import com.saju.sajubackend.api.matching.repository.MatchingPaginationRepository;
import com.saju.sajubackend.api.matching.repository.MatchingQueryDslRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.enums.CelestialStem;
import com.saju.sajubackend.common.enums.DrinkingFrequency;
import com.saju.sajubackend.common.enums.Gender;
import com.saju.sajubackend.common.enums.RelationshipStatus;
import com.saju.sajubackend.common.enums.Religion;
import com.saju.sajubackend.common.enums.SmokingStatus;
import com.saju.sajubackend.common.util.MatchingRedisUtil;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MatchingService {

    private final MatchingRedisUtil matchingRedisUtil;
    private final MatchingQueryDslRepository matchingQueryDslRepository;
    private final MatchingPaginationRepository matchingPaginationRepository;
    private final MemberRepository memberRepository;

    private final int MAGINOT_SCORE = 80;
    private final int MEMBER_COUNT = 3;
    private final int PAGE_SIZE = 20;

    public List<MatchingMemberResponseDto> getMatchingMembers(Long memberId) {

        // 1. redis에 이미 존재하는지 확인
        List<MatchingMemberResponseDto> response = matchingRedisUtil.getCache(memberId);
        if (response != null && !response.isEmpty()) {
            // 0번째 데이터 변경
            response.set(0, MatchingMemberResponseDto.fromEntity(
                    memberRepository.findById(15L).orElse(
                            Member.builder()
                                    .memberId(15L)
                                    .bday(LocalDate.of(1997, 3, 22))
                                    .btime(LocalDateTime.of(1997, 3, 22, 10, 0))
                                    .nickname("수정나무")
                                    .intro("안녕하세용!")
                                    .profileImg("https://i.pravatar.cc/300?img=10")
                                    .height(165)
                                    .cityCode(1L)
                                    .dongCode(102L)
                                    .age(27)
                                    .smoking(SmokingStatus.NON_SMOKER)
                                    .drinking(DrinkingFrequency.ONCE_TWICE_PER_WEEK)
                                    .religion(Religion.CHRISTIANITY)
                                    .gender(Gender.FEMALE)
                                    .celestialStem(CelestialStem.GI_TO)
                                    .relation(RelationshipStatus.SOLO)
                                    .build()
                    ),
                    94 // 매칭 점수는 0으로 설정 (필요시 변경 가능)
            ));
            return response;
        }

        // 2. 랜덤으로 3명 가져오기
        Map<Member, Integer> matchingMembers = matchingQueryDslRepository.findMatchingMembers(memberId, MAGINOT_SCORE,
                MEMBER_COUNT);

        response = matchingMembers.entrySet().stream()
                .map(entry -> MatchingMemberResponseDto.fromEntity(entry.getKey(), entry.getValue()))
                .toList();

        if (!response.isEmpty()) {
            // 0번째 데이터 변경
            response.set(0, MatchingMemberResponseDto.fromEntity(
                    memberRepository.findById(15L).orElse(
                            Member.builder()
                                    .memberId(15L)
                                    .bday(LocalDate.of(1997, 3, 22))
                                    .btime(LocalDateTime.of(1997, 3, 22, 10, 0))
                                    .nickname("수정나무")
                                    .intro("안녕하세용!")
                                    .profileImg("https://i.pravatar.cc/300?img=10")
                                    .height(165)
                                    .cityCode(1L)
                                    .dongCode(102L)
                                    .age(27)
                                    .smoking(SmokingStatus.NON_SMOKER)
                                    .drinking(DrinkingFrequency.ONCE_TWICE_PER_WEEK)
                                    .religion(Religion.CHRISTIANITY)
                                    .gender(Gender.FEMALE)
                                    .celestialStem(CelestialStem.GI_TO)
                                    .relation(RelationshipStatus.SOLO)
                                    .build()
                    ),
                    94 // 매칭 점수는 0으로 설정 (필요시 변경 가능)
            ));

            matchingRedisUtil.createCache(memberId, response);
        }

        return response;
    }

    public MemberListResponseDto getMembers(Long memberId, Integer cursor) {
        if (cursor == null) {
            cursor = 0;
        }
        
        Map<Member, Integer> members = matchingPaginationRepository.findMembers(memberId, cursor,
                PAGE_SIZE + 1); // hasNext인지 확인하기 위해 pageSize보다 1개 더 가져옴
        return MemberListResponseDto.fromEntity(members);
    }

    public MatchingProfileResponseDto getMatchingMemberProfile(Long memberId, Long partnerId) {
        System.out.println("[🙌 memberId : " + memberId + "partnerId : " + partnerId
                + " - MatchingService.getMatchingMemberProfile()]");

        return matchingQueryDslRepository.findMatchingMember(memberId, partnerId);
    }
}
