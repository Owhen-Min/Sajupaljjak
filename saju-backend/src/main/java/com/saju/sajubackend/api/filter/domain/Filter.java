package com.saju.sajubackend.api.filter.domain;

import com.saju.sajubackend.api.filter.dto.UserPreferenceRequest;
import com.saju.sajubackend.api.member.domain.Member;
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

    @Column(nullable = false)
    private int smokingId;

    @Column(nullable = false)
    private int drinkingId;

    @Column(name = "min_height")
    private Integer minHeight;

    @Column(name = "max_height")
    private Integer maxHeight;

    @Column(name = "min_age")
    private Integer minAge;

    @Column(name = "max_age")
    private Integer maxAge;

    @Builder
    public Filter(Long filterId, Member member, int smokingId, int drinkingId, Integer minHeight, Integer maxHeight, Integer minAge, Integer maxAge) {
        this.filterId = filterId;
        this.member = member;
        this.smokingId = smokingId;
        this.drinkingId = drinkingId;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    public static Filter from(UserPreferenceRequest request, Member member) {
        return Filter.builder()
                .member(member)
                .smokingId((request.getSmokingFilter()))
                .drinkingId(request.getDrinkingFilter())
                .minHeight((request.getMinHeight()))
                .maxHeight(request.getMaxHeight())
                .minAge(request.getMinAge())
                .maxAge(request.getMaxAge())
                .build();
    }
}

