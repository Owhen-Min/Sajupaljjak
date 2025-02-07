package com.saju.sajubackend.api.matching.controller;

import com.saju.sajubackend.api.matching.dto.MemberListResponseDto;
import com.saju.sajubackend.api.matching.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/match")
@RestController
public class MatchingController {

    private final MatchingService matchingService;

    @GetMapping("/top")
    public ResponseEntity<List<MemberListResponseDto>> getMatchingMembers(Long memberId) { // todo : 나중에 토큰에서 꺼내도록 수정
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(matchingService.getMatchingMembers(memberId));
    }
}
