package com.saju.sajubackend.api.saju.domain;

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
@Table(name = "Score")
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "score_id")
    private Long scoreId;

    @Convert(converter = CelestialStemConverter.class)
    @Column
    private CelestialStem source;

    @Convert(converter = CelestialStemConverter.class)
    @Column
    private CelestialStem target;

    @Column(nullable = false)
    private Long score;

    @Builder
    private Score(Long scoreId, CelestialStem source, CelestialStem target, Long score) {
        this.scoreId = scoreId;
        this.source = source;
        this.target = target;
        this.score = score;
    }
}
