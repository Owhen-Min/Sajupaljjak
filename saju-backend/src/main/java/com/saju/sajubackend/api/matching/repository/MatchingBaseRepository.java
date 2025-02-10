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
import java.time.LocalDate;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.saju.sajubackend.api.filter.domain.QFilter.filter;
import static com.saju.sajubackend.api.filter.domain.QRegionFilter.regionFilter;
import static com.saju.sajubackend.api.filter.domain.QReligionFilter.religionFilter;
import static com.saju.sajubackend.api.member.domain.QMember.member;
import static com.saju.sajubackend.api.saju.domain.QScore.score1;

@RequiredArgsConstructor
public abstract class MatchingBaseRepository {

    protected final JPAQueryFactory queryFactory;

    protected Member findMember(Long memberId) {
        return queryFactory
                .selectFrom(member)
                .where(member.memberId.eq(memberId))
                .fetchOne();
    }

    protected Filter findFilter(Member member) {
        return queryFactory
                .selectFrom(filter)
                .where(filter.member.eq(member))
                .fetchOne();
    }

    protected Map<CelestialStem, Integer> getCompatibleCelestialStems(CelestialStem celestialStem, long maginot) {
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
                        tuple -> tuple.get(1, Integer.class)
                ));
    }

    protected BooleanExpression isOppositeGender(Gender gender) {
        return member.gender.ne(gender);
    }

    protected BooleanExpression isSolo() {
        return member.relationship.eq(RelationshipStatus.SOLO);
    }

    protected BooleanExpression matchCelestialStem(Set<CelestialStem> compatibleStems) {
        return member.celestialStem.in(compatibleStems);
    }

    protected BooleanExpression matchReligion(Filter filter) {
        return member.religion.in(
                JPAExpressions.select(religionFilter.religion)
                        .from(religionFilter)
                        .where(religionFilter.filter.eq(filter))
        );
    }

    protected BooleanExpression matchRegion(Filter filter) {
        return member.cityCode.in(
                JPAExpressions.select(regionFilter.cityCode)
                        .from(regionFilter)
                        .where(regionFilter.filter.eq(filter))
        );
    }

    protected BooleanExpression matchFilter(Filter filter) {
        LocalDate maxBirthDay = LocalDate.now().minusYears(filter.getMinAge());
        LocalDate minBirthDay = LocalDate.now().minusYears(filter.getMaxAge());

        return member.smoking.eq(filter.getSmoking())
                .and(member.drinking.eq(filter.getDrinking()))
                .and(member.height.between(filter.getMinHeight(), filter.getMaxHeight()))
                .and(member.bday.between(minBirthDay, maxBirthDay));
    }
}

