package com.saju.sajubackend.common.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    // JWT 검증을 제외할 URL 목록
    private static final List<String> EXCLUDE_URLS = List.of(
            "/api/auth/login/kakao",
            "/api/auth/signup",
            "/api/auth/access-token",
            "/",
            "/api/auth",
            "/api/image"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        String method = request.getMethod();
        log.info("🛠 [JWT 필터] 요청 URI: {} | METHOD: {}", requestURI, method);

        if (method.equalsIgnoreCase("OPTIONS")) {
            log.info("✅ [CORS OPTIONS 요청] 필터를 건너뜀");
            response.setStatus(HttpStatus.OK.value());
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Requested-With");
            return;
        }

        // 예외 URL에 해당하면 필터를 건너뜀
        if (EXCLUDE_URLS.contains(requestURI)) {
            log.info("✅ [예외 URL 요청] 필터를 건너뜀: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }
        String authorizationHeader = request.getHeader("Authorization");
        log.info("🔍 [JWT 필터] Authorization Header: {}", authorizationHeader);

        try {
            String accessToken = getJwtFromRequest(request);

            if (accessToken == null) {
                log.warn("❌ [JWT 필터] Authorization 헤더 없음! 요청 URI: {}", requestURI);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            log.info("🔑 [JWT 필터] 추출된 Access Token: {}", accessToken);

            if (jwtProvider.validateToken(accessToken)) {
                Long memberId = jwtProvider.getUserIdFromToken(accessToken);
                request.setAttribute("memberId", memberId);
                log.info("✅ [JWT 인증 성공] memberId: {}", memberId);
            } else {
                log.warn("❌ [JWT 인증 실패] 유효하지 않은 토큰! 요청 URI: {}", requestURI);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        } catch (Exception e) {
            log.error("❌ [JWT 필터] 인증 오류: {}", e.getMessage());
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
