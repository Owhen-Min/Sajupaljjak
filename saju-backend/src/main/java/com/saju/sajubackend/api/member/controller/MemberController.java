package com.saju.sajubackend.api.member.controller;

import com.saju.sajubackend.api.member.dto.MemberProfileResponse;
import com.saju.sajubackend.api.member.dto.SajuUpdateRequest;
import com.saju.sajubackend.api.member.dto.UpdateProfileRequest;
import com.saju.sajubackend.api.member.service.MemberService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<MemberProfileResponse> getMemberProfile(@CurrentMemberId Long currentMemberId) {
        MemberProfileResponse response = memberService.getMemberProfile(currentMemberId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateMemberProfile(
            @RequestBody UpdateProfileRequest updateProfileRequest,
            @CurrentMemberId Long currentMemberId) {

        memberService.updateMemberProfile(currentMemberId, updateProfileRequest);

        return ResponseEntity.ok("프로필이 성공적으로 수정되었습니다.");
    }

    @PutMapping
    public ResponseEntity<String> updateSaju(
            @CurrentMemberId Long currentMemberId,
            @RequestBody SajuUpdateRequest sajuUpdateRequest) {

        memberService.updateSaju(currentMemberId, sajuUpdateRequest);

        return ResponseEntity.ok("사주가 성공적으로 수정되었습니다.");
    }
}
