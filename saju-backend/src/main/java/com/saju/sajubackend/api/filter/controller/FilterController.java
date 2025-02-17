package com.saju.sajubackend.api.filter.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saju.sajubackend.api.filter.dto.FilterSaveRequestDto;
import com.saju.sajubackend.api.filter.dto.MemberProfileResponse;
import com.saju.sajubackend.api.filter.dto.UpdateProfileRequest;
import com.saju.sajubackend.api.filter.service.FilterService;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.enums.DrinkingFrequency;
import com.saju.sajubackend.common.enums.Religion;
import com.saju.sajubackend.common.enums.SmokingStatus;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class FilterController {

    private final FilterService filterService;
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
    @PatchMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateMemberProfile(
            HttpServletRequest request,
            @RequestBody UpdateProfileRequest updateProfileRequest){

        Long memberId = extractMemberIdFromToken(request);
        filterService.updateMemberProfile(memberId, updateProfileRequest);

        return ResponseEntity.ok("프로필이 성공적으로 수정되었습니다.");
    }
}