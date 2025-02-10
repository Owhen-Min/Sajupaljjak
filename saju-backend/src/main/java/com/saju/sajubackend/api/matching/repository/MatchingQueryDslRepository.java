package com.saju.sajubackend.api.matching.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.enums.CelestialStem;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.saju.sajubackend.api.member.domain.QMember.member;

@Repository
public class MatchingQueryDslRepository extends MatchingBaseRepository {

    public MatchingQueryDslRepository(JPAQueryFactory queryFactory) {
        super(queryFactory);
    }

    public Map<Member, Integer> findMatchingMembers(Long memberId, long maginot, int count) {
        // 1. 회원 정보 조회
        Member foundMember = findMember(memberId);

        if (foundMember == null) return Collections.emptyMap();

        // 2. 필터 정보 조회
        Filter foundFilter = findFilter(foundMember);

        // 3. 80점 이상인 천간과 점수 조회
        Map<CelestialStem, Integer> compatibleStemsMap = getCompatibleCelestialStems(foundMember.getCelestialStem(), maginot);

        // 4. 상대 필터링
        List<Member> candidates = queryFactory
                .selectFrom(member)
                .where(
                        isOppositeGender(foundMember.getGender()) // 성별 반대
                                .and(isSolo())                  // 싱글 여부
                                .and(matchReligion(foundFilter))  // 종교
                                .and(matchCelestialStem(compatibleStemsMap.keySet())) // 천간
                                .and(matchRegion(foundFilter))    // 지역
                                .and(matchFilter(foundFilter))    // 그 외(키, 나이, 흡연, 음주)
                )
                .fetch();

        // 5. 랜덤으로 3명 선발
        List<Member> selectedCandidates = random(candidates, count);

        // 6. Map<Member, Integer> 형태로 변환
        return selectedCandidates.stream()
                .collect(Collectors.toMap(
                        member -> member,
                        member -> compatibleStemsMap.getOrDefault(member.getCelestialStem(), 0)
                ));
    }


    private List<Member> random(List<Member> candidates, int limit) {
        Collections.shuffle(candidates);
        return candidates.stream().limit(limit).collect(Collectors.toList());
    }
}
