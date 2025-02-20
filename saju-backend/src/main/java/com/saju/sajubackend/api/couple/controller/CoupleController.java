package com.saju.sajubackend.api.couple.controller;

import com.saju.sajubackend.api.couple.dto.CoupleDateListResponseDto;
import com.saju.sajubackend.api.couple.dto.CoupleResponseDto;
import com.saju.sajubackend.api.couple.service.CoupleService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/couples")
public class CoupleController {

    private final CoupleService coupleService;

    @GetMapping()
    public ResponseEntity<CoupleResponseDto> getCouple(@CurrentMemberId Long currentMemberId) {
        return ResponseEntity.ok(coupleService.getCouple(currentMemberId));
    }

    @GetMapping("/date")
    public ResponseEntity<CoupleDateListResponseDto> getCoupleDateList(
            @RequestParam int month,
            @CurrentMemberId Long currentMemberId) {
        return ResponseEntity.ok(coupleService.getCoupleDateList(month, currentMemberId));
    }
}