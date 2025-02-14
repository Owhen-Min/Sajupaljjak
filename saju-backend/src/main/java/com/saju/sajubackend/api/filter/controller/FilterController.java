package com.saju.sajubackend.api.filter.controller;

import com.saju.sajubackend.api.filter.dto.FilterSaveRequestDto;
<<<<<<< HEAD
import com.saju.sajubackend.api.filter.dto.MemberProfileResponse;
import com.saju.sajubackend.api.filter.service.FilterService;
import com.saju.sajubackend.common.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
=======
import com.saju.sajubackend.api.filter.service.FilterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

>>>>>>> front
@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class FilterController {

    private final FilterService filterService;
<<<<<<< HEAD
    private final JwtProvider jwtProvider;

    @PostMapping
    public ResponseEntity<Void> createFilter(@Valid @RequestBody FilterSaveRequestDto request,
                                             Long memberId) { // todo : 토큰에서 memberId 꺼내기
        filterService.createFilter(request, memberId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<MemberProfileResponse> getMemberProfile(HttpServletRequest requestObj) {
        Long memberId = extractMemberIdFromToken(requestObj);
        MemberProfileResponse response = filterService.getMemberProfile(memberId);
        return ResponseEntity.ok(response);
    }

    private Long extractMemberIdFromToken(HttpServletRequest request) {
        System.out.println("==== Request Headers ====");
        request.getHeaderNames().asIterator()
                .forEachRemaining(header -> System.out.println(header + ": " + request.getHeader(header)));

        String token = request.getHeader("Authorization");
        System.out.println("🔹 Received Token: " + token);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            System.out.println("🔹 Extracted Token: " + token);
        } else {
            System.out.println("🚨 JWT 토큰이 요청에서 누락됨!");
            throw new RuntimeException("JWT 토큰이 필요합니다.");
        }

        if (!jwtProvider.validateToken(token)) {
            System.out.println("❌ 유효하지 않은 JWT 토큰: " + token);
            throw new RuntimeException("유효하지 않은 JWT 토큰입니다.");
        }

        Long userId = jwtProvider.getUserIdFromToken(token);
        System.out.println("✅ Extracted User ID from Token: " + userId);

        return userId;
    }

}
=======

    @PostMapping
    public ResponseEntity<Void> createFilter(@Valid @RequestBody FilterSaveRequestDto request,
                                            Long memberId) { // todo : 토큰에서 memberId 꺼내기
        filterService.createFilter(request, memberId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
>>>>>>> front
