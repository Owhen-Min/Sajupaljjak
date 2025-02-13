package com.saju.sajubackend.api.auth.service;

import com.saju.sajubackend.api.token.RefreshToken;
import com.saju.sajubackend.api.token.RefreshTokenRepository;
import com.saju.sajubackend.api.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    //새리프레시 토큰 저장(기존 토큰 삭제 후 저장)
    @Transactional
    public void saveRefreshToken(Member member, String token) {
        Optional<RefreshToken> existingToken = refreshTokenRepository.findByMember_MemberId(member.getMemberId());

        if (existingToken.isPresent()) {
            // ✅ 기존 토큰이 있으면 업데이트
            RefreshToken refreshToken = existingToken.get();
            refreshToken.updateRefreshToken(token); // refreshToken 필드 업데이트
            refreshTokenRepository.save(refreshToken);
        } else {
            // ✅ 기존 토큰이 없으면 새로 저장
            RefreshToken newToken = RefreshToken.builder()
                    .member(member)
                    .refreshToken(token)
                    .build();
            refreshTokenRepository.save(newToken);
        }
    }

    // 회원의 리프레시 토큰 조회
    @Transactional(readOnly = true)
    public Optional<RefreshToken> getRefreshToken(Long memberId) {
        return refreshTokenRepository.findByMember_MemberId(memberId);
    }

    // 회원의 리프레시 토큰 삭제
    @Transactional
    public void deleteRefreshToken(Long memberId) {
        refreshTokenRepository.deleteByMember_MemberId(memberId);
    }
}