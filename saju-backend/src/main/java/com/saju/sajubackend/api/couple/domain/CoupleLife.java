package com.saju.sajubackend.api.couple.domain;

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
@Table(name = "COUPLE_LIFE")
public class CoupleLife {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "couple_life_id")
    private Long coupleLifeId;

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
    private CoupleLife(Long coupleLifeId, Couple couple, String harmony, String chemi, String good, String bad, String advice) {
        this.coupleLifeId = coupleLifeId;
        this.couple = couple;
        this.harmony = harmony;
        this.chemi = chemi;
        this.good = good;
        this.bad = bad;
        this.advice = advice;
    }
}
