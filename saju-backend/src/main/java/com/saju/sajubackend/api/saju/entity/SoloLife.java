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

    @Column(columnDefinition = "TEXT")
    private String characteristic;

    @Column(columnDefinition = "TEXT")
    private String flow;

    @Column(columnDefinition = "TEXT")
    private String danger;

    @Column(columnDefinition = "TEXT")
    private String advice;

}
