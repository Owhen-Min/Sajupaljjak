package com.saju.sajubackend.api.chat.service;

import com.saju.sajubackend.api.chat.dto.ChatMessageResponseDto;
import com.saju.sajubackend.api.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.Comparator;

@RequiredArgsConstructor
@Service
public class ChatHistoryService {

    private final ChatMessageRepository chatMessageRepository;

    public Flux<ChatMessageResponseDto> getChatHistory(String chatroomId) {
        return chatMessageRepository.getMessages(chatroomId)
                .map(ChatMessageResponseDto::fromDocument)
                .sort(Comparator.comparing(ChatMessageResponseDto::getSendTime)); // 오름차순 정렬(최신 메시지가 아래)
    }
}
