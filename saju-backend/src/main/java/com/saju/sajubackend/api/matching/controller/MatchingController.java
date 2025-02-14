package com.saju.sajubackend.api.matching.controller;

import com.saju.sajubackend.api.matching.dto.*;
import com.saju.sajubackend.api.matching.service.MatchingService;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.service.MemberService;
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
    public ResponseEntity<MatchingProfileResponseDto> getMatchingProfile(
            @PathVariable Long partnerId, Long memberId) { // todo : 나중에 토큰에서 꺼내도록 수정
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(matchingService.getMatchingMemberProfile(memberId, partnerId));
    }

    @GetMapping("/filter")
    public ResponseEntity<MemberFilterResponse> getMemberFilter(Long memberId) {
        Member member = memberService.getMember(memberId);
        return ResponseEntity.ok(MemberFilterResponse.from(member));
    }

    @PutMapping("/filter")
    public ResponseEntity<Void> updateMemberFilter(Long memberId,
                                                   @RequestBody MemberFilterRequest request) {
        memberService.updateMemberFilter(memberId, request);
        return ResponseEntity.ok().build();
    }
}
