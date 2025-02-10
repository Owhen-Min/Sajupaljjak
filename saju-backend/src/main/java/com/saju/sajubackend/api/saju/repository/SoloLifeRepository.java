package com.saju.sajubackend.api.saju.repository;

import com.saju.sajubackend.api.saju.entity.SoloLife;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SoloLifeRepository extends JpaRepository<SoloLife, Long> {
    Optional<SoloLife> findBySijuAndIlju(String siju, String ilju);
}