package com.saju.sajubackend.api.saju.repository;

import com.saju.sajubackend.api.saju.entity.SoloYear;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SoloYearRepository extends JpaRepository<SoloYear, Long> {
    Optional<SoloYear> findBySijuAndIlju(String siju, String ilju);
}