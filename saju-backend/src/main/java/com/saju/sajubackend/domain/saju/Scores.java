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
@Table(name = "Scores")
public class Scores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scores_id")
    private Long scoresId;

    @OneToOne
    @JoinColumn(name = "source_id")
    private CelestialStems source;

    @OneToOne
    @JoinColumn(name = "target_id")
    private CelestialStems target;

    @Column(nullable = false)
    private Long score;

    @Builder
    private Scores(Long scoresId, CelestialStems source, CelestialStems target, Long score) {
        this.scoresId = scoresId;
        this.source = source;
        this.target = target;
        this.score = score;
    }
}
