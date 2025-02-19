package com.saju.sajubackend.api.matching.controller;

import com.saju.sajubackend.api.matching.dto.MatchingMemberResponseDto;
import com.saju.sajubackend.api.matching.dto.MatchingProfileResponseDto;
import com.saju.sajubackend.api.matching.dto.MemberListResponseDto;
import com.saju.sajubackend.api.matching.service.MatchingService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
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
    public ResponseEntity<List<MatchingMemberResponseDto>> getMatchingMembers(@CurrentMemberId Long currentMemberId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(matchingService.getMatchingMembers(currentMemberId));
    }

    @GetMapping
    public ResponseEntity<MemberListResponseDto> getMembers(@RequestParam(required = false) Integer cursor,
                                                            @CurrentMemberId Long currentMemberId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(matchingService.getMembers(currentMemberId, cursor));
    }

    @GetMapping("/{partnerId}")
    public ResponseEntity<MatchingProfileResponseDto> getMatchingProfile(
            @PathVariable Long partnerId, @CurrentMemberId Long currentMemberId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(matchingService.getMatchingMemberProfile(currentMemberId, partnerId));
    }
}
