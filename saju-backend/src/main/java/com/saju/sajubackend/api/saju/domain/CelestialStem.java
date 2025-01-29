package com.saju.sajubackend.api.saju.domain;

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
@Table(name = "CelestialStem")
public class CelestialStem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "celestial_stem_id")
    private Long celestialStemId;

    @Column(name = "celestial_stem_name", nullable = false, length = 20)
    private String celestialStemName;

    @Builder
    private CelestialStem(Long celestialStemId, String celestialStemName) {
        this.celestialStemId = celestialStemId;
        this.celestialStemName = celestialStemName;
    }
}

