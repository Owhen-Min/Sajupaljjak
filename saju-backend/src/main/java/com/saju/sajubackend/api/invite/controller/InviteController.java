package com.saju.sajubackend.api.invite.controller;

import com.saju.sajubackend.api.invite.dto.CoupleCreateRequestDto;
import com.saju.sajubackend.api.invite.dto.InviteCreateResponseDto;
import com.saju.sajubackend.api.invite.service.InviteService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inviting")
public class InviteController {
    private final InviteService inviteService;

    @GetMapping()
    public ResponseEntity<InviteCreateResponseDto> createInviteCode(@CurrentMemberId Long currentMemberId) {
        return ResponseEntity.ok(inviteService.createInviteCode(currentMemberId));
    }

    @PostMapping()
    public ResponseEntity<Void> createCouple(
            @RequestBody CoupleCreateRequestDto request,
            @CurrentMemberId Long currentMemberId) {

        inviteService.createCouple(currentMemberId, request.invitingCode(), request.startDate());
        return ResponseEntity.ok().build();
    }

    // @GetMapping("/confirm")
    // public ResponseEntity<String> confirmCouple() {
    //     Long inviterId = 1L;
    //     boolean isConfirmed = inviteService.confirmCouple(inviterId);

    //     return isConfirmed
    //             ? ResponseEntity.ok("커플이 정상적으로 등록되었습니다.")
    //             : ResponseEntity.status(HttpStatus.ACCEPTED).body("상대가 아직 코드를 입력하지 않았습니다.");
    // }
    @GetMapping("/confirm")
    public ResponseEntity<Object> confirmCouple(@CurrentMemberId Long currentMemberId) {
        boolean isConfirmed = inviteService.confirmCouple(currentMemberId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", isConfirmed ? "커플이 정상적으로 등록되었습니다." : "상대가 아직 코드를 입력하지 않았습니다.");
        response.put("status", isConfirmed ? 200 : 202);

        return ResponseEntity.status(isConfirmed ? HttpStatus.OK : HttpStatus.ACCEPTED).body(response);
    }
}
