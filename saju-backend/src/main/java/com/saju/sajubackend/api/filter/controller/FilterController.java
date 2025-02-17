package com.saju.sajubackend.api.filter.controller;

import com.saju.sajubackend.api.filter.dto.FilterSaveRequestDto;
import com.saju.sajubackend.api.filter.dto.MemberProfileResponse;
import com.saju.sajubackend.api.filter.dto.UpdateProfileRequest;
import com.saju.sajubackend.api.filter.service.FilterService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class FilterController {

    private final FilterService filterService;

    @PostMapping
    public ResponseEntity<Void> createFilter(@Valid @RequestBody FilterSaveRequestDto request,
                                             @CurrentMemberId Long currentMemberId) {
        filterService.createFilter(request, currentMemberId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<MemberProfileResponse> getMemberProfile(@CurrentMemberId Long currentMemberId) {
        MemberProfileResponse response = filterService.getMemberProfile(currentMemberId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateMemberProfile(
            @CurrentMemberId Long currentMemberId,
            @RequestBody UpdateProfileRequest updateProfileRequest) {

        filterService.updateMemberProfile(currentMemberId, updateProfileRequest);

        return ResponseEntity.ok("프로필이 성공적으로 수정되었습니다.");
    }
}