package com.saju.sajubackend.api.saju.repository;

import com.saju.sajubackend.api.saju.entity.CoupleYearFortune;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoupleYearRepository extends JpaRepository<CoupleYearFortune,Long> {
    Optional<CoupleYearFortune> findByMaleAndFemale(String male, String female);
}
