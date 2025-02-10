package com.saju.sajubackend.api.matching.controller;

import com.saju.sajubackend.api.matching.dto.MatchingMemberDetialResponseDto;
import com.saju.sajubackend.api.matching.dto.MatchingMemberResponseDto;
import com.saju.sajubackend.api.matching.dto.MemberListResponseDto;
import com.saju.sajubackend.api.matching.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/match")
@RestController
public class MatchingController {

    private final MatchingService matchingService;

    @GetMapping("/top")
    public ResponseEntity<List<MatchingMemberResponseDto>> getMatchingMembers(Long memberId) { // todo : 나중에 토큰에서 꺼내도록 수정
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(matchingService.getMatchingMembers(memberId));
    }

    @GetMapping
    public ResponseEntity<MemberListResponseDto> getMembers(@RequestParam(required = false) Integer cursor,
                                                            Long memberId) { // todo : 나중에 토큰에서 꺼내도록 수정
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(matchingService.getMembers(memberId, cursor));
    }

    @GetMapping("/{partnerId}")
    public ResponseEntity<MatchingMemberDetialResponseDto> getMatchingProfile(
            @PathVariable Long partnerId, Long memberId) { // todo : 나중에 토큰에서 꺼내도록 수정
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(matchingService.getMatchingMemberProfile(memberId, partnerId));
    }
}
