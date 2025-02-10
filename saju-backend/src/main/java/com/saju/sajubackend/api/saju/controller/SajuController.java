package com.saju.sajubackend.api.saju.controller;

import com.saju.sajubackend.api.saju.dto.SajuDetailResponse;
import com.saju.sajubackend.api.saju.dto.SajuResponse;
import com.saju.sajubackend.api.saju.dto.SoloLifeDto;
import com.saju.sajubackend.api.saju.dto.SoloYearDto;
import com.saju.sajubackend.api.saju.service.FortuneService;
import com.saju.sajubackend.api.saju.service.SajuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/fortune")
public class SajuController {

    private SajuService sajuService;
    private FortuneService fortuneService;

    public SajuController(SajuService sajuService, FortuneService fortuneService) {
        this.sajuService = sajuService;
        this.fortuneService = fortuneService;
    }

    // todo : memberId 토큰에서 꺼내기

    // 오늘의 운세 조회 기능 !!!!!!!!!!!!!!!!!!!!!!!!!

    // 간단한 사주(운세) 조회 API (/api/saju)
    @GetMapping
    public ResponseEntity<SajuResponse> getDailySaju(Long memberId) {
        SajuResponse response = sajuService.getDailySajuForMember(memberId);
        return ResponseEntity.ok(response);
    }

    // 오늘의 상세 사주(운세) 조회 API (/api/saju/today)
    @GetMapping("/today")
    public ResponseEntity<SajuDetailResponse> getTodaySajuDetail(Long memberId) {
        SajuDetailResponse response = sajuService.getTodaySajuDetailForMember(memberId);
        return ResponseEntity.ok(response);
    }


    // 신년 운세 조회 기능 !!!!!!!!!!!!!!!!!!!!!!!!!

    @GetMapping("/new-year")
    public ResponseEntity<SoloYearDto> getNewYearFortune(
           Long memberId) {
        SoloYearDto fortuneDto = fortuneService.getNewYearFortune(memberId);
        return ResponseEntity.ok(fortuneDto);
    }

    @GetMapping("/lifetime")
    public ResponseEntity<SoloLifeDto> getLifeTimeFortune(
           Long memberId ) {
        SoloLifeDto fortuneDto = fortuneService.getLifeTimeFortune(memberId);
        return ResponseEntity.ok(fortuneDto);
    }

}
