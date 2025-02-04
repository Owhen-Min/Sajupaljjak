package com.saju.sajubackend.api.saju.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "SOLO_YEAR")
public class SoloYear {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solo_year_id")
    private Long soloYearId;

    @Column(nullable = false)
    private Long sajuId;

    @Column(nullable = false)
    private String characteristic;

    @Column(nullable = false)
    private String flow;

    @Column(nullable = false)
    private String danger;

    @Column(nullable = false)
    private String advice;

    @Builder
    private SoloYear(Long soloYearId, Long sajuId, String characteristic, String flow, String danger, String advice) {
        this.soloYearId = soloYearId;
        this.sajuId = sajuId;
        this.characteristic = characteristic;
        this.flow = flow;
        this.danger = danger;
        this.advice = advice;
    }
}
