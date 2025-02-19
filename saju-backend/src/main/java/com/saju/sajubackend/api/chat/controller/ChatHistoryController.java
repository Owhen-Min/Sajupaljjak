package com.saju.sajubackend.api.chat.controller;

import com.saju.sajubackend.api.chat.dto.response.ChatHistoryResponseDto;
import com.saju.sajubackend.api.chat.service.ChatHistoryService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/chats")
@RestController
public class ChatHistoryController {

    private final ChatHistoryService chatHistoryService;

    @GetMapping("/{chatroomId}")
    public ResponseEntity<ChatHistoryResponseDto> getChatMessages(@PathVariable String chatroomId, @CurrentMemberId Long memberId) {
        return ResponseEntity.ok(chatHistoryService.getChatHistory(chatroomId, memberId));
    }
}

