package com.saju.sajubackend.api.chat.service;

import com.saju.sajubackend.api.chat.domain.Chatroom;
import com.saju.sajubackend.api.chat.dto.response.ChatHistoryResponseDto;
import com.saju.sajubackend.api.chat.dto.response.ChatMessageResponseDto;
import com.saju.sajubackend.api.chat.repository.ChatMessageRepository;
import com.saju.sajubackend.api.chat.repository.ChatroomQueryDslRepository;
import com.saju.sajubackend.api.chat.repository.ChatroomRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.UnAuthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class ChatHistoryService {

    private final ChatroomRepository chatroomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatroomQueryDslRepository chatroomQueryDslRepository;

    public ChatHistoryResponseDto getChatHistory(String chatroomId, Long memberId) {
        if (Objects.isNull(chatroomId)) throw new BadRequestException(ErrorMessage.INVALID_CHAT_ROOM);

        isAuthorized(Long.parseLong(chatroomId), memberId);

        Member partner = chatroomQueryDslRepository.findPartner(memberId, Long.parseLong(chatroomId));

        List<ChatMessageResponseDto> messages = chatMessageRepository.findByChatroomId(chatroomId)
                .stream()
                .map(ChatMessageResponseDto::fromDocument)
                .toList();

        return ChatHistoryResponseDto.builder()
                .partner(partner)
                .messages(messages)
                .build();
    }

    private void isAuthorized(Long chatroomId, Long memberId) {
        Chatroom chatroom = chatroomRepository.findById(chatroomId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.INVALID_CHAT_ROOM));

        if (isChatMember(chatroom, memberId)) throw new UnAuthorizedException(ErrorMessage.ERR_UNAUTHORIZED);
    }

    private boolean isChatMember(Chatroom chatroom, Long memberId) {
        return (chatroom.getMember1().getMemberId() != memberId)
                && (chatroom.getMember2().getMemberId() != memberId);
    }
}
