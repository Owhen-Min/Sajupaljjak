package com.saju.sajubackend.api.matching.repository;

import static com.saju.sajubackend.api.member.domain.QMember.member;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.enums.CelestialStem;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Repository;

@Repository
public class MatchingPaginationRepository extends MatchingBaseRepository {

    public MatchingPaginationRepository(JPAQueryFactory queryFactory) {
        super(queryFactory);
    }

    public Map<Member, Integer> findMembers(Long memberId, Integer cursor, Integer pageSize) {
        // 1. 회원 조회
        Member foundMember = findMember(memberId);

        // 2. 필터 조회
        Filter foundFilter = findFilter(foundMember);

        // 3. 천간과 점수 조회
        Map<CelestialStem, Integer> compatibleStemsMap = getCompatibleCelestialStems(foundMember.getCelestialStem(), 0);

        // 3. 필터에 맞는 상대 찾기
        List<Member> memberList = queryFactory
                .selectFrom(member)
                .where(
                        isOppositeGender(foundMember.getGender()) // 성별 반대
                                .and(isSolo())                  // 싱글 여부
//                                .and(matchReligion(foundFilter))  // 종교
//                                .and(matchRegion(foundFilter))    // 지역
//                                .and(matchFilter(foundFilter))    // 그 외(키, 나이, 흡연, 음주)
                                .and(cursor != null ? member.memberId.goe(cursor) : null) // cursor 기반 페이징
                )
                .orderBy(member.memberId.desc())
                .limit(pageSize)
                .fetch();

        // 6. Map<Member, Integer> 형태로 변환
        return memberList.stream()
                .collect(Collectors.toMap(
                        member -> member,
                        member -> compatibleStemsMap.getOrDefault(member.getCelestialStem(), 0)
                ));
    }
}
