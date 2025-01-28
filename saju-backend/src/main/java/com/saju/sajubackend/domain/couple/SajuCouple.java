package com.saju.sajubackend.domain.couple;

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
@Table(name = "SAJU_COUPLE")
public class SajuCouple {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "saju_couple_id")
    private Long sajuCoupleId;

    @OneToOne
    @JoinColumn(name = "couple_id", nullable = false)
    private Couple couple;

    @Column(name = "saju_couple_content", nullable = false, columnDefinition = "TEXT")
    private String sajuCoupleContent;

    @Builder
    private SajuCouple(Long sajuCoupleId, Couple couple, String sajuCoupleContent) {
        this.sajuCoupleId = sajuCoupleId;
        this.couple = couple;
        this.sajuCoupleContent = sajuCoupleContent;
    }
}
