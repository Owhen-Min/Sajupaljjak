package com.saju.sajubackend.api.chat.controller;

import com.saju.sajubackend.api.chat.dto.request.ChatroomLeaveRequestDto;
import com.saju.sajubackend.api.chat.dto.response.CreateChatroomResponseDto;
import com.saju.sajubackend.api.chat.service.ChatroomService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/chats")
@RestController
public class ChatroomController {

    private final ChatroomService chatroomService;

    @PostMapping("/{partnerId}")
    public ResponseEntity<CreateChatroomResponseDto> createChatroom(@PathVariable Long partnerId,
                                                                    @CurrentMemberId Long currentMemberId) {
        return ResponseEntity.ok(chatroomService.getChatroom(currentMemberId, partnerId));
    }

    @PatchMapping
    public ResponseEntity<Void> leave(@RequestBody ChatroomLeaveRequestDto request,
                                      @CurrentMemberId Long currentMemberId) {
        chatroomService.leave(request, currentMemberId);
        return ResponseEntity.ok().build();
    }
}
