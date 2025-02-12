package com.saju.sajubackend.api.couple.repository;

import com.saju.sajubackend.api.couple.domain.Couple;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoupleRepository extends JpaRepository<Couple, Long>, CoupleCustomRepository {
}