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
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.saju.sajubackend.api.filter.domain.QFilter.filter;
import static com.saju.sajubackend.api.filter.domain.QRegionFilter.regionFilter;
import static com.saju.sajubackend.api.filter.domain.QReligionFilter.religionFilter;
import static com.saju.sajubackend.api.member.domain.QMember.member;
import static com.saju.sajubackend.api.saju.domain.QScore.score1;

@RequiredArgsConstructor
@Repository
public class MatchingPaginationRepository {

    private final JPAQueryFactory queryFactory;

    public Map<Member, Integer> findMembers(Long memberId, Integer cursor) {
        // 1. 회원 조회
        Member foundMember = queryFactory
                .selectFrom(member)
                .where(member.memberId.eq(memberId))
                .fetchOne();

        // 2. 필터 조회
        Filter foundFilter = queryFactory
                .selectFrom(filter)
                .where(filter.member.eq(foundMember))
                .fetchOne();

        // 3. 천간과 점수 조회
        Map<CelestialStem, Integer> compatibleStemsMap = queryFactory
                .select(score1.target, score1.score)
                .from(score1)
                .where(score1.source.eq(foundMember.getCelestialStem()))
                .fetch()
                .stream()
                .collect(Collectors.toMap(
                        tuple -> tuple.get(score1.target),
                        tuple -> tuple.get(1, Integer.class)
                ));

        // 3. 필터에 맞는 상대 찾기
        List<Member> memberList = queryFactory
                .selectFrom(member)
                .where(
                        isOppositeGender(foundMember.getGender()) // 성별 반대
                                .and(isSolo())                  // 싱글 여부
                                .and(matchReligion(foundFilter))  // 종교
                                .and(matchRegion(foundFilter))    // 지역
                                .and(matchFilter(foundFilter))    // 그 외(키, 나이, 흡연, 음주)
                )
                .fetch();

        // 6. Map<Member, Integer> 형태로 변환
        return memberList.stream()
                .collect(Collectors.toMap(
                        member -> member,
                        member -> compatibleStemsMap.getOrDefault(member.getCelestialStem(), 0)
                ));
    }

    private BooleanExpression isOppositeGender(Gender gender) {
        return member.gender.ne(gender);
    }

    private BooleanExpression isSolo() {
        return member.relationship.eq(RelationshipStatus.SOLO);
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
}
