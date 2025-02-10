package com.saju.sajubackend.api.couple.domain;

import com.saju.sajubackend.common.converter.CelestialStemConverter;
import com.saju.sajubackend.common.enums.CelestialStem;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "COUPLE_LIFE")
public class CoupleLife {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "couple_life_id")
    private Long coupleLifeId;

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

    @Column(nullable = false)
    private String male;

    @Column(nullable = false)
    private String female;

    @Builder
    private CoupleLife(Long coupleLifeId, String harmony, String chemi, String good, String bad, String advice, String male, String female) {
        this.coupleLifeId = coupleLifeId;
        this.harmony = harmony;
        this.chemi = chemi;
        this.good = good;
        this.bad = bad;
        this.advice = advice;
        this.male = male;
        this.female = female;
    }
}
