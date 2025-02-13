package com.saju.sajubackend.common.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {
    @Value("${jwt.secret}")
    private String secretKey;

    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60; // 1시간
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 14; // 2주

    private final RedisTemplate<String, Object> redisTemplate;

    @PostConstruct
    protected void init() {
        log.info("✅ [JWT 초기화] Secret Key 설정 시작...");
        log.info("✅ [JWT Secret Key (Before Encoding)] {}", secretKey);
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        log.info("✅ [JWT Secret Key (After Encoding)] {}", secretKey);
    }

    public String createAccessToken(long memberId) {
        Claims claims = Jwts.claims().subject(String.valueOf(memberId)).build();
        Date now = new Date();
        String token = createToken(claims, now, ACCESS_TOKEN_EXPIRE_TIME);

        log.info("✅ [JWT 생성] Access Token 생성 완료 | memberId: {} | 만료 시간: {} ms | token: {}",
                memberId, ACCESS_TOKEN_EXPIRE_TIME, token);
        return token;
    }

    public String createRefreshToken(long memberId) {
        Claims claims = Jwts.claims().subject(String.valueOf(memberId)).build();
        Date now = new Date();
        String refreshToken = createToken(claims, now, REFRESH_TOKEN_EXPIRE_TIME);

        // Redis에 저장
        redisTemplate.opsForValue()
                .set(String.valueOf(memberId), refreshToken, REFRESH_TOKEN_EXPIRE_TIME, TimeUnit.MILLISECONDS);

        log.info("✅ [JWT 생성] Refresh Token 생성 완료 | memberId: {} | 만료 시간: {} ms | token: {}",
                memberId, REFRESH_TOKEN_EXPIRE_TIME, refreshToken);
        return refreshToken;
    }

    private String createToken(Claims claims, Date now, long expireTime) {
        String token = Jwts.builder()
                .claims(claims)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expireTime))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();

        log.info("✅ [JWT 생성] Token 생성 완료 | Expire Time: {} ms", expireTime);
        return token;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                    .build()
                    .parseSignedClaims(token);

            log.info("✅ [JWT 검증] 유효한 토큰 | token: {}", token);
            return true;
        } catch (io.jsonwebtoken.security.SignatureException e) {
            log.error("❌ [JWT 검증 실패] 서명 오류 (SignatureException): {} | token: {}", e.getMessage(), token);
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            log.error("❌ [JWT 검증 실패] 만료된 토큰 (ExpiredJwtException): {} | token: {}", e.getMessage(), token);
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            log.error("❌ [JWT 검증 실패] 잘못된 토큰 형식 (MalformedJwtException): {} | token: {}", e.getMessage(), token);
        } catch (Exception e) {
            log.error("❌ [JWT 검증 실패] 기타 오류: {} | token: {}", e.getMessage(), token);
        }
        return false;
    }

    public long getUserIdFromToken(String token) {
        try {
            long userId = Long.parseLong(Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject());

            log.info("✅ [JWT 정보 추출] userId: {} | token: {}", userId, token);
            return userId;
        } catch (Exception e) {
            log.error("❌ [JWT 정보 추출 실패] {} | token: {}", e.getMessage(), token);
            throw new RuntimeException("유효하지 않은 토큰입니다.");
        }
    }

    /**
     * 액세스 토큰의 만료 시간을 반환
     * @return 밀리초 단위의 만료 시간
     */
    public long getAccessTokenExpirationTime() {
        return ACCESS_TOKEN_EXPIRE_TIME;
    }
}