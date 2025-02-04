package com.saju.sajubackend.api.saju.controller;

// 패키지: com.example.saju.controller


import com.saju.sajubackend.api.saju.dto.SajuDetailResponse;
import com.saju.sajubackend.api.saju.dto.SajuResponse;
import com.saju.sajubackend.api.saju.service.SajuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saju")
public class SajuController {

    @Autowired
    private SajuService sajuService;

    // todo : memberId 토큰에서 꺼내기

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
}
