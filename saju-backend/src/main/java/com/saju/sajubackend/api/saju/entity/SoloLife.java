package com.saju.sajubackend.api.saju.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "LIFE_FORTUNE")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SoloLife {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long soloLifeId;

    private String siju;
    private String ilju;
    private String characteristic;
    private String flow;
    private String danger;
    private String advice;


}
