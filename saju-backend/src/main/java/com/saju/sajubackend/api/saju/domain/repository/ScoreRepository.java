package com.saju.sajubackend.api.saju.domain.repository;

import com.saju.sajubackend.api.saju.domain.Score;
import com.saju.sajubackend.common.enums.CelestialStem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ScoreRepository extends JpaRepository<Score, Long> {

    @Query("SELECT s.score FROM Score s WHERE s.source = :source AND s.target = :target")
    Long findScoreByCelestialStem(@Param("source") CelestialStem source, @Param("target") CelestialStem target);
}


