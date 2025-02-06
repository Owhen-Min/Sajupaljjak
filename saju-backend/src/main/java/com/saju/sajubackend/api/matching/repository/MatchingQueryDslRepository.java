package com.saju.sajubackend.api.matching.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.enums.CelestialStem;
import com.saju.sajubackend.common.enums.Gender;
import com.saju.sajubackend.common.enums.RelationshipStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.saju.sajubackend.api.filter.domain.QFilter.filter;
import static com.saju.sajubackend.api.filter.domain.QRegionFilter.regionFilter;
import static com.saju.sajubackend.api.filter.domain.QReligionFilter.religionFilter;
import static com.saju.sajubackend.api.member.domain.QMember.member;
import static com.saju.sajubackend.api.saju.domain.QScore.score1;

@RequiredArgsConstructor
@Repository
public class MatchingQueryDslRepository {

    private final JPAQueryFactory queryFactory;

    public Map<Member, Long> findMatchingMembers(Long memberId, long maginot, int count) {
        // 1. 회원 정보 조회
        Member foundMember = queryFactory
                .selectFrom(member)
                .where(member.memberId.eq(memberId))
                .fetchOne();

        if (foundMember == null) return Collections.emptyMap();

        // 2. 필터 정보 조회
        Filter foundFilter = queryFactory
                .selectFrom(filter)
                .where(filter.member.eq(foundMember))
                .fetchOne();

        // 3. 80점 이상인 천간과 점수 조회
        Map<CelestialStem, Long> compatibleStemsMap = getCompatibleCelestialStems(foundMember.getCelestialStem(), maginot);

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
                        member -> compatibleStemsMap.getOrDefault(member.getCelestialStem(), 0L)
                ));
    }

    private Map<CelestialStem, Long> getCompatibleCelestialStems(CelestialStem celestialStem, long maginot) {
        return queryFactory
                .select(score1.target, score1.score)
                .from(score1)
                .where(
                        score1.source.eq(celestialStem)
                                .and(score1.score.goe(maginot))
                )
                .fetch()
                .stream()
                .collect(Collectors.toMap(
                        tuple -> tuple.get(score1.target),
                        tuple -> tuple.get(1, Long.class)
                ));
    }

    private BooleanExpression isOppositeGender(Gender gender) {
        return member.gender.ne(gender);
    }

    private BooleanExpression isSolo() {
        return member.isCouple.eq(RelationshipStatus.SOLO);
    }

    private BooleanExpression matchCelestialStem(Set<CelestialStem> compatibleStems) {
        return member.celestialStem.in(compatibleStems);
    }

    private BooleanExpression matchReligion(Filter filter) {
        return member.religion.in(
                JPAExpressions.select(religionFilter.religion)
                        .from(religionFilter)
                        .where(religionFilter.filter.eq(filter))
        );
    }

    private BooleanExpression matchRegion(Filter filter) {
        return member.cityCode.in(
                JPAExpressions.select(regionFilter.cityCode)
                        .from(regionFilter)
                        .where(regionFilter.filter.eq(filter))
        );
    }

    private BooleanExpression matchFilter(Filter filter) {
        LocalDate maxBirthDay = LocalDate.now().minusYears(filter.getMinAge());
        LocalDate minBirthDay = LocalDate.now().minusYears(filter.getMaxAge());

        return member.smoking.eq(filter.getSmoking())
                .and(member.drinking.eq(filter.getDrinking()))
                .and(member.height.between(filter.getMinHeight(), filter.getMaxHeight()))
                .and(member.bday.between(minBirthDay, maxBirthDay));
    }

    private List<Member> random(List<Member> candidates, int limit) {
        Collections.shuffle(candidates);
        return candidates.stream().limit(limit).collect(Collectors.toList());
    }
}
