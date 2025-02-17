package com.saju.sajubackend.api.matching.controller;

import com.saju.sajubackend.api.matching.dto.*;
import com.saju.sajubackend.api.matching.service.MatchingService;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.service.MemberService;
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
    private final MemberService memberService;

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

    @GetMapping("/filter")
    public ResponseEntity<MemberFilterResponse> getMemberFilter(@CurrentMemberId Long currentMemberId) {
        Member member = memberService.getMember(currentMemberId);
        return ResponseEntity.ok(MemberFilterResponse.from(member));
    }

    @PutMapping("/filter")
    public ResponseEntity<Void> updateMemberFilter(@CurrentMemberId Long currentMemberId,
                                                   @RequestBody MemberFilterRequest request) {
        memberService.updateMemberFilter(currentMemberId, request);
        return ResponseEntity.ok().build();
    }
}
