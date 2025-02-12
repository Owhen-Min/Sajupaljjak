package com.saju.sajubackend.api.saju.repository;

import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.saju.domain.Saju;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SajuRepository extends JpaRepository<Saju, Long> {
    // Member를 기반으로 Saju 정보를 조회할 수 있는 메서드 예시
    Optional<Saju> findByMember(Member member);
}
