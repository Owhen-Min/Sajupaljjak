package com.saju.sajubackend.api.chat.controller;

import com.saju.sajubackend.api.chat.dto.ChatroomResponseDto;
import com.saju.sajubackend.api.chat.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api/chats")
@RestController
public class ChatroomController {

    private final ChatroomService chatroomService;

    @PostMapping("/{partnerId}")
    public ResponseEntity<ChatroomResponseDto> createChatroom(@PathVariable Long partnerId,
                                                              Long memberId) { // todo : 토큰에서 memberId 꺼내도록 수정
        return ResponseEntity.ok(chatroomService.getChatroom(memberId, partnerId));
    }
}
