package com.saju.sajubackend.api.invite.controller;

import com.saju.sajubackend.api.invite.dto.CoupleCreateRequestDto;
import com.saju.sajubackend.api.invite.dto.InviteCreateResponseDto;
import com.saju.sajubackend.api.invite.service.InviteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inviting")
public class InviteController {
    private final InviteService inviteService;

    @GetMapping("/")
    public ResponseEntity<InviteCreateResponseDto> createInviteCode() {
        // TODO : 토큰에서 가져오기
        Long memberId = 1L;
        return ResponseEntity.ok(inviteService.createInviteCode(memberId));
    }

    @PostMapping("/")
    public ResponseEntity<Void> createCouple(@RequestBody CoupleCreateRequestDto request) {
        // TODO: 토큰에서 가져오기
        Long joinerId = 2L;
        inviteService.createCouple(joinerId, request.invitingCode());
        return ResponseEntity.ok().build();
    }
}