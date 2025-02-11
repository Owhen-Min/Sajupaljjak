package com.saju.sajubackend.api.couple.repository;

import com.saju.sajubackend.api.couple.domain.Couple;

import java.util.Optional;

public interface CoupleCustomRepository {
    boolean existsByMemberId(Long memberId);

    Optional<Couple> findByMemberId(Long memberId);
}