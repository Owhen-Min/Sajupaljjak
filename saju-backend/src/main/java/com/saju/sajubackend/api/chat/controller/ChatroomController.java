package com.saju.sajubackend.api.chat.controller;

import com.saju.sajubackend.api.chat.dto.request.ChatroomLeaveRequestDto;
import com.saju.sajubackend.api.chat.dto.response.CreateChatroomResponseDto;
import com.saju.sajubackend.api.chat.service.ChatroomService;
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
                                                                    Long memberId) { // todo : 토큰에서 memberId 꺼내도록 수정
        return ResponseEntity.ok(chatroomService.getChatroom(memberId, partnerId));
    }

    @PatchMapping
    public ResponseEntity<Void> leave(@RequestBody ChatroomLeaveRequestDto request,
                                      Long memberId) { // todo : 토큰에서 memberId 꺼내도록 수정
        chatroomService.leave(request, memberId);
        return ResponseEntity.ok().build();
    }
}
