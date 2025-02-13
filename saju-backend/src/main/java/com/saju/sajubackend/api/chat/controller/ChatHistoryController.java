package com.saju.sajubackend.api.chat.controller;

import com.saju.sajubackend.api.chat.dto.ChatMessageResponseDto;
import com.saju.sajubackend.api.chat.service.ChatHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/chats")
@RestController
public class ChatHistoryController {

    private final ChatHistoryService chatHistoryService;

    @GetMapping("/{chatroomId}")
    public ResponseEntity<List<ChatMessageResponseDto>> getChatMessages(@PathVariable String chatroomId, Long memberId) { // todo : 토큰에서 memberId 꺼내도록 수정
        return ResponseEntity.ok(chatHistoryService.getChatHistory(chatroomId, memberId));
    }
}

