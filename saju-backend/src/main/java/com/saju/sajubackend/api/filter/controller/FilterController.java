package com.saju.sajubackend.api.filter.controller;

import com.saju.sajubackend.api.filter.dto.FilterSaveRequestDto;
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
@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class FilterController {

    private final FilterService filterService;

    @PostMapping
    public ResponseEntity<Void> createFilter(@Valid @RequestBody FilterSaveRequestDto request,
                                             HttpServletRequest requestObj) { // todo : 토큰에서 memberId 꺼내기
        Long memberId = getLoggedInUserId(requestObj);
        filterService.createFilter(request, memberId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<MemberProfileResponse> getMemberProfile(HttpServletRequest requestObj) {
        Long memberId = getLoggedInUserId(requestObj);
        MemberProfileResponse response = filterService.getMemberProfile(memberId);
        return ResponseEntity.ok(response);
    }

    private Long getLoggedInUserId(HttpServletRequest request) {
        Object memberIdObj = request.getAttribute("memberId");

        if(memberIdObj==null){
            throw new RuntimeException("로그인이 필요합니다.");
        }
        return (Long) memberIdObj;
    }


}