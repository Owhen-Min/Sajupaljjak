package com.saju.sajubackend.common.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;

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
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createAccessToken(long memberId) {
        Claims claims = Jwts.claims().subject(String.valueOf(memberId)).build();
        Date now = new Date();
        return createToken(claims, now, ACCESS_TOKEN_EXPIRE_TIME);
    }

    public String createRefreshToken(long memberId) {
        Claims claims = Jwts.claims().subject(String.valueOf(memberId)).build();
        Date now = new Date();
        String refreshToken = createToken(claims, now, REFRESH_TOKEN_EXPIRE_TIME);

        // Redis에 저장
        redisTemplate.opsForValue()
                .set(String.valueOf(memberId), refreshToken, REFRESH_TOKEN_EXPIRE_TIME, TimeUnit.MILLISECONDS);

        return refreshToken;
    }

    private String createToken(Claims claims, Date now, long expireTime) {
        return Jwts.builder()
                .claims(claims)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expireTime))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public long getUserIdFromToken(String token) {
        return Long.parseLong(Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject());
    }

    /**
     * 액세스 토큰의 만료 시간을 반환
     * @return 밀리초 단위의 만료 시간
     */
    public long getAccessTokenExpirationTime() {
        return ACCESS_TOKEN_EXPIRE_TIME;
    }
}