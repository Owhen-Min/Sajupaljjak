package com.saju.sajubackend.api.saju.repository;

import com.saju.sajubackend.api.couple.domain.CoupleYear;
import com.saju.sajubackend.api.saju.entity.CoupleLife;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoupleLifeRepository extends JpaRepository<CoupleLife,Long> {
    Optional<CoupleLife> findByMaleAndFemale(String male, String female);
}
