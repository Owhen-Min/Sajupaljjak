package com.saju.sajubackend.api.saju.repository;

import com.saju.sajubackend.api.saju.domain.Score;
import com.saju.sajubackend.common.enums.CelestialStem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScoreRepository extends JpaRepository<Score, Long> {

    Optional<Score> findBySourceAndTarget(CelestialStem source, CelestialStem target);

}


