package com.saju.sajubackend.api.token;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByMember_MemberId(Long memberId);
    void deleteByMember_MemberId(Long memberId);
}
