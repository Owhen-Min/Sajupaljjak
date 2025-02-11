package com.saju.sajubackend.api.couple.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.saju.sajubackend.api.couple.domain.QCouple.couple;

@Repository
@RequiredArgsConstructor
public class CoupleRepositoryImpl implements CoupleCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public boolean existsByMemberId(Long memberId) {
        return queryFactory
                .selectOne()
                .from(couple)
                .where(couple.coupleMale.memberId.eq(memberId)
                        .or(couple.coupleFemale.memberId.eq(memberId)))
                .fetchFirst() != null;
    }
}