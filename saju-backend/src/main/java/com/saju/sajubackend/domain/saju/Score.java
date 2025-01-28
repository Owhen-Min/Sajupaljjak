package com.saju.sajubackend.domain.saju;

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
@Table(name = "Score")
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "score_id")
    private Long scoreId;

    @OneToOne
    @JoinColumn(name = "source_id")
    private CelestialStem source;

    @OneToOne
    @JoinColumn(name = "target_id")
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
