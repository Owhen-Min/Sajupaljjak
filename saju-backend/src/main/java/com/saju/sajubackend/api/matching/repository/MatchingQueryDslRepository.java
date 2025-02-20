package com.saju.sajubackend.api.matching.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.matching.dto.MatchingProfileResponseDto;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.domain.QMember;
import com.saju.sajubackend.api.saju.domain.QSaju;
import com.saju.sajubackend.common.enums.CelestialStem;
import com.saju.sajubackend.common.enums.Gender;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.saju.sajubackend.api.couple.domain.QCoupleYear.coupleYear;
import static com.saju.sajubackend.api.member.domain.QMember.member;
import static com.saju.sajubackend.api.saju.domain.QSaju.saju;
import static com.saju.sajubackend.api.saju.domain.QScore.score1;

@Repository
public class MatchingQueryDslRepository extends MatchingBaseRepository {

    public MatchingQueryDslRepository(JPAQueryFactory queryFactory) {
        super(queryFactory);
    }

    public Map<Member, Integer> findMatchingMembers(Long memberId, int maginot, int count) {
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
     //                           .and(isSolo())                  // 싱글 여부
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

    public MatchingProfileResponseDto findMatchingMember(Long memberId, Long partnerId) {

        QMember partner = new QMember("partner");
        QSaju partnerSaju = new QSaju("partnerSaju");

        return queryFactory
                .select(Projections.constructor(
                        MatchingProfileResponseDto.class,
                        partner.memberId,
                        partner.nickname,
                        score1.score,
                        partner.profileImg,
                        partner.cityCode.stringValue(),
                        partner.age,
                        partner.celestialStem,
                        partner.intro,
                        partnerSaju.yearly,
                        partnerSaju.monthly,
                        partnerSaju.daily,
                        partnerSaju.timely,
                        coupleYear.harmony,
                        coupleYear.chemi,
                        coupleYear.good,
                        coupleYear.bad,
                        coupleYear.advice
                ))
                .from(member) // 1. 회원 정보 조회
                .join(partner).on(partner.memberId.eq(partnerId)) // 2. 매칭 상대 정보 조회
                .leftJoin(score1).on(score1.source.eq(member.celestialStem).and(score1.target.eq(partner.celestialStem))) // 3. 궁합 점수 조회
                .leftJoin(saju).on(saju.member.eq(member)) // 4. 회원 사주 정보 조회
                .leftJoin(partnerSaju).on(partnerSaju.member.eq(partner)) // 5. 매칭 상대 사주 정보 조회
                .leftJoin(coupleYear) // 6. 궁합 리포트 조회
                .on(member.gender.eq(Gender.MALE) // 6.1 회원이 남성인 경우,
                        .and(coupleYear.male.eq(saju.daily)).and(coupleYear.female.eq(partnerSaju.daily))
                        .or(member.gender.eq(Gender.FEMALE) // 6.2 회원이 여성인 경우
                                .and(coupleYear.male.eq(partnerSaju.daily)).and(coupleYear.female.eq(saju.daily)))
                )
                .where(member.memberId.eq(memberId))
                .fetchFirst();
    }


    private List<Member> random(List<Member> candidates, int limit) {
        Collections.shuffle(candidates);
        return candidates.stream().limit(limit).collect(Collectors.toList());
    }
}
