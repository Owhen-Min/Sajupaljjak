package com.saju.sajubackend.api.couple.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saju.sajubackend.api.couple.domain.Couple;

public interface CoupleRepository extends JpaRepository<Couple, Long> {
}