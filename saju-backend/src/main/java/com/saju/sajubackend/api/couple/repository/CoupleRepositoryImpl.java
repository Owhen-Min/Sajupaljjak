package com.saju.sajubackend.api.couple.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saju.sajubackend.api.couple.domain.Couple;
import com.saju.sajubackend.api.couple.domain.QCouple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

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

    @Override
    public Optional<Couple> findByMemberId(Long memberId) {
        QCouple qCouple = QCouple.couple;

        Couple couple = queryFactory
                .select(qCouple)
                .from(qCouple)
                .where(qCouple.coupleMale.memberId.eq(memberId)
                        .or(qCouple.coupleFemale.memberId.eq(memberId)))
                .fetchFirst();

        return Optional.ofNullable(couple);
    }
}