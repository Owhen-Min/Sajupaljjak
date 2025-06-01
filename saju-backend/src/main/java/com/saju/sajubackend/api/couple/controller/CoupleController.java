package com.saju.sajubackend.api.couple.controller;

import com.saju.sajubackend.api.couple.dto.CoupleResponseDto;
import com.saju.sajubackend.api.couple.service.CoupleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/couples")
public class CoupleController {

    private final CoupleService coupleService;

    @GetMapping()
    public ResponseEntity<CoupleResponseDto> getCouple() {
        // TODO : 토큰에서 가져오기
        Long memberId = 1L;
        return ResponseEntity.ok(coupleService.getCouple(memberId));
    }
}