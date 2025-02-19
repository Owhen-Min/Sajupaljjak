package com.saju.sajubackend.api.saju.controller;

import com.saju.sajubackend.api.saju.dto.*;
import com.saju.sajubackend.api.saju.service.FortuneService;
import com.saju.sajubackend.api.saju.service.SajuService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/fortune")
public class SajuController {

    private final SajuService sajuService;
    private final FortuneService fortuneService;

//    public SajuController(SajuService sajuService, FortuneService fortuneService) {
//        this.sajuService = sajuService;
//        this.fortuneService = fortuneService;
//    }

    // todo : memberId 토큰에서 꺼내기

    // 오늘의 운세 조회 기능 !!!!!!!!!!!!!!!!!!!!!!!!!

    // 간단한 사주(운세) 조회 API (/api/saju)
    @GetMapping
    public ResponseEntity<SajuResponse> getDailySaju(@CurrentMemberId Long currentMemberId) {
        SajuResponse response = sajuService.getDailySajuForMember(currentMemberId);
        return ResponseEntity.ok(response);
    }

    // 오늘의 상세 사주(운세) 조회 API (/api/saju/today)
    @GetMapping("/today")
    public ResponseEntity<SajuDetailResponse> getTodaySajuDetail(@CurrentMemberId Long currentMemberId) {
        SajuDetailResponse response = sajuService.getTodaySajuDetailForMember(currentMemberId);
        return ResponseEntity.ok(response);
    }


    // 신년 운세 조회 기능 !!!!!!!!!!!!!!!!!!!!!!!!!

    @GetMapping("/new-year")
    public ResponseEntity<SoloYearDto> getNewYearFortune(@CurrentMemberId Long currentMemberId) {
        SoloYearDto fortuneDto = fortuneService.getNewYearFortune(currentMemberId);
        return ResponseEntity.ok(fortuneDto);
    }

    @GetMapping("/lifetime")
    public ResponseEntity<SoloLifeDto> getLifeTimeFortune(@CurrentMemberId Long currentMemberId) {
        SoloLifeDto fortuneDto = fortuneService.getLifeTimeFortune(currentMemberId);
        return ResponseEntity.ok(fortuneDto);
    }

    @GetMapping("/info")
    public ResponseEntity<SajuInfoDto> getSajuInfo(@CurrentMemberId Long currentMemberId) {
        SajuInfoDto sajuInfoDto = fortuneService.getSajuInfo(currentMemberId);
        return ResponseEntity.ok(sajuInfoDto);
    }

    @GetMapping("/couple-new-year")
    public ResponseEntity<CoupleYearDto> getCoupleNewYearFortune(@CurrentMemberId Long currentMemberId) {
        CoupleYearDto fortuneDto = fortuneService.getCoupleNewYearFortune(currentMemberId);
        return ResponseEntity.ok(fortuneDto);
    }

    @GetMapping("/couple-lifetime")
    public ResponseEntity<CoupleLifeDto> getCoupleLifeTimeFortune(@CurrentMemberId Long currentMemberId) {
        CoupleLifeDto fortuneDto = fortuneService.getCoupleLifeTimeFortune(currentMemberId);
        return ResponseEntity.ok(fortuneDto);
    }

}
