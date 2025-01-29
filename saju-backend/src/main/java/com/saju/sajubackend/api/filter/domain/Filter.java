package com.saju.sajubackend.api.filter.domain;

import com.saju.sajubackend.api.member.domain.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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

    @OneToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToOne
    @JoinColumn(name = "smoking_id", nullable = false)
    private Smoking smoking;

    @OneToOne
    @JoinColumn(name = "drinking_id", nullable = false)
    private Drinking drinking;

    @OneToOne
    @JoinColumn(name = "religion_id", nullable = false)
    private Religion religion;

    @Column(name = "min_height")
    private Integer minHeight;

    @Column(name = "max_height")
    private Integer maxHeight;

    @Column(name = "min_age")
    private Integer minAge;

    @Column(name = "max_age")
    private Integer maxAge;

    @Builder
    private Filter(Long filterId, Member member, Smoking smoking, Drinking drinking, Religion religion,
                  Integer minHeight,
                  Integer maxHeight, Integer minAge, Integer maxAge) {
        this.filterId = filterId;
        this.member = member;
        this.smoking = smoking;
        this.drinking = drinking;
        this.religion = religion;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }
}

