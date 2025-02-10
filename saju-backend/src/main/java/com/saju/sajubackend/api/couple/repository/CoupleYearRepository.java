package com.saju.sajubackend.api.couple.repository;

import com.saju.sajubackend.api.couple.domain.CoupleYear;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoupleYearRepository extends JpaRepository<CoupleYear, Long> {

    Optional<CoupleYear> findByMaleAndFemale(String male, String female);
}
