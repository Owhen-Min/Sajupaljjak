package com.saju.sajubackend.domain.saju;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "CelestialStems")
public class CelestialStems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "celestial_stems_id")
    private Long celestialStemsId;

    @Column(name = "celestial_stems_name", nullable = false, length = 20)
    private String celestialStemsName;

    @Builder
    private CelestialStems(Long celestialStemsId, String celestialStemsName) {
        this.celestialStemsId = celestialStemsId;
        this.celestialStemsName = celestialStemsName;
    }
}

