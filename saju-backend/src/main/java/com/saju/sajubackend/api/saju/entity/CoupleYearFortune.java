package com.saju.sajubackend.api.saju.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "COUPLE_YEAR_FORTUNE")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CoupleYearFortune {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long coupleYearId;

    private String male;
    private String female;

    @Column(columnDefinition = "TEXT")
    private String harmony;

    @Column(columnDefinition = "TEXT")
    private String chemi;

    @Column(columnDefinition = "TEXT")
    private String good;

    @Column(columnDefinition = "TEXT")
    private String bad;

    @Column(columnDefinition = "TEXT")
    private String advice;

}