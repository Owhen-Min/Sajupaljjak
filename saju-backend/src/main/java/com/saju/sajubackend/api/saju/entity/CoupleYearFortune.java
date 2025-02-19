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
    private String harmony;
    private String chemi;
    private String good;
    private String bad;
    private String advice;

}