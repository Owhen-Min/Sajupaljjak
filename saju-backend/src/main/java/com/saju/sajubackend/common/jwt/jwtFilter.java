package com.saju.sajubackend.common.jwt;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class jwtFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    // JWT 검증을 제외할 URL 목록
    private static final List<String> EXCLUDE_URLS = List.of(
            "/api/auth/login/kakao",
            "/api/auth/signup",
            "/api/auth/access-token",
            "/"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (request.getMethod().toUpperCase().equals("OPTIONS")) { // OPTIONS 메서드는 안전하므로 별도의 인증 필요 없음 (필터 종료)
            response.setStatus(HttpStatus.OK.value());

            // CORS 헤더 추가
            response.setHeader("Access-Control-Allow-Origin", "*"); // 모든 출처 허용 (혹은 특정 출처만 허용)
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Requested-With");

            return;
        }

        String requestURI = request.getRequestURI();

        // 예외 URL에 해당하면 필터를 건너뜀
        if (EXCLUDE_URLS.contains(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String accessToken = getJwtFromRequest(request);

            if (accessToken != null && jwtProvider.validateToken(accessToken)) {
                request.setAttribute("memberId", jwtProvider.getUserIdFromToken(accessToken));
            }
        } catch (Exception e) {
            System.err.println("Authentication error: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}