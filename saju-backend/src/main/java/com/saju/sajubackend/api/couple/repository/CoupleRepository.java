package com.saju.sajubackend.api.couple.repository;

import com.saju.sajubackend.api.couple.domain.Couple;
import com.saju.sajubackend.api.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoupleRepository extends JpaRepository<Couple, Long>, CoupleCustomRepository {
    Optional<Couple> findByCoupleMale(Member coupleMale);
    Optional<Couple> findByCoupleFemale(Member coupleFemale);
}