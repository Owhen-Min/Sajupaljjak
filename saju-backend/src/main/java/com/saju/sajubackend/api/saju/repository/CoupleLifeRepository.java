package com.saju.sajubackend.api.saju.repository;

import com.saju.sajubackend.api.saju.entity.CoupleLifeFortune;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoupleLifeRepository extends JpaRepository<CoupleLifeFortune,Long> {
    Optional<CoupleLifeFortune> findByMaleAndFemale(String male, String female);
}
