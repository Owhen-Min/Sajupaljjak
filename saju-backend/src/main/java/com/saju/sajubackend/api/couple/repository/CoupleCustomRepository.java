package com.saju.sajubackend.api.couple.repository;

public interface CoupleCustomRepository {
    boolean existsByMemberId(Long memberId);
}