package com.saju.sajubackend.api.filter.domain;

import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.converter.DrinkingFrequencyConverter;
import com.saju.sajubackend.common.converter.SmokingStatusConverter;
import com.saju.sajubackend.common.enums.DrinkingFrequency;
import com.saju.sajubackend.common.enums.SmokingStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "FILTER")
public class Filter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "filter_id")
    private Long filterId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Convert(converter = SmokingStatusConverter.class)
    @Column(nullable = false)
    private SmokingStatus smoking;

    @Convert(converter = DrinkingFrequencyConverter.class)
    @Column(nullable = false)
    private DrinkingFrequency drinking;

    @Column(name = "min_height")
    private Integer minHeight;

    @Column(name = "max_height")
    private Integer maxHeight;

    @Column(name = "min_age")
    private Integer minAge;

    @Column(name = "max_age")
    private Integer maxAge;

    @Builder
    private Filter(Long filterId, Member member, SmokingStatus smoking, DrinkingFrequency drinking, Integer minHeight, Integer maxHeight, Integer minAge, Integer maxAge) {
        this.filterId = filterId;
        this.member = member;
        this.smoking = smoking;
        this.drinking = drinking;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    public void update(
            SmokingStatus smoking,
            DrinkingFrequency drinking,
            Integer minHeight,
            Integer maxHeight,
            Integer minAge,
            Integer maxAge
    ) {
        this.smoking = smoking;
        this.drinking = drinking;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }
}

