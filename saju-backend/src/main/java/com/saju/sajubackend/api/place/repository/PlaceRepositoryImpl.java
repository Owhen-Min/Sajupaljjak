package com.saju.sajubackend.api.place.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saju.sajubackend.api.place.domain.Place;
import com.saju.sajubackend.api.place.domain.QPlace;
import com.saju.sajubackend.common.enums.Element;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PlaceRepositoryImpl implements PlaceCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<List<Place>> findPlaces(int element, Long fCity, Long mCity) {
        QPlace place = QPlace.place;

        BooleanExpression condition = place.element.eq(Element.fromCode(element))
                .and(place.cityCode.in(fCity, mCity));

        return Optional.ofNullable(queryFactory.selectFrom(place)
                .where(condition)
                .orderBy(Expressions.numberTemplate(Double.class, "function('RAND')").asc())
                .limit(3)
                .fetch());
    }

    @Override
    public List<Place> findPlacesByElementOnly(int element) {
        QPlace place = QPlace.place;

        return queryFactory.selectFrom(place)
                .where(place.element.eq(Element.fromCode(element)))
                .orderBy(Expressions.numberTemplate(Double.class, "function('RAND')").asc())
                .limit(3) // 랜덤 3개 가져오기
                .fetch();
    }
}
