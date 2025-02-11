package com.saju.sajubackend.api.invite.controller;

import com.saju.sajubackend.api.invite.dto.CoupleCreateRequestDto;
import com.saju.sajubackend.api.invite.dto.InviteCreateResponseDto;
import com.saju.sajubackend.api.invite.service.InviteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
        inviteService.createCouple(joinerId, request.invitingCode(), request.startDate());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmCouple() {
        Long inviterId = 1L;
        boolean isConfirmed = inviteService.confirmCouple(inviterId);

        return isConfirmed
                ? ResponseEntity.ok("커플이 정상적으로 등록되었습니다.")
                : ResponseEntity.status(HttpStatus.ACCEPTED).body("상대가 아직 코드를 입력하지 않았습니다.");
    }
}