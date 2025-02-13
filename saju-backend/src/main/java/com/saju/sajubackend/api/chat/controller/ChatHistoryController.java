package com.saju.sajubackend.api.chat.controller;

import com.saju.sajubackend.api.chat.dto.ChatMessageResponseDto;
import com.saju.sajubackend.api.chat.service.ChatHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RequiredArgsConstructor
@RequestMapping("/api/chats")
@RestController
public class ChatHistoryController {

    private final ChatHistoryService chatHistoryService;

    @GetMapping("/{chatroomId}")
    public Flux<ChatMessageResponseDto> getChatMessages(@PathVariable String chatroomId) {
        return chatHistoryService.getChatHistory(chatroomId);
    }
}

