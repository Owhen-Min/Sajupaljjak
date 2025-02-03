package com.saju.sajubackend.api.couple.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "COUPLE_YEAR")
public class CoupleYear {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "couple_year_id")
    private Long coupleYearId;

    @OneToOne
    @JoinColumn(name = "couple_id", nullable = false)
    private Couple couple;

    @Column(nullable = false)
    private String harmony;

    @Column(nullable = false)
    private String chemi;

    @Column(nullable = false)
    private String good;

    @Column(nullable = false)
    private String bad;

    @Column(nullable = false)
    private String advice;

    @Builder
    private CoupleYear(Long coupleYearId, Couple couple, String harmony, String chemi, String good, String bad, String advice) {
        this.coupleYearId = coupleYearId;
        this.couple = couple;
        this.harmony = harmony;
        this.chemi = chemi;
        this.good = good;
        this.bad = bad;
        this.advice = advice;
    }
}
