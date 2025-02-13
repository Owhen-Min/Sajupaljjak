package com.saju.sajubackend.api.chat.service;

import com.saju.sajubackend.api.chat.domain.Chatroom;
import com.saju.sajubackend.api.chat.dto.ChatMessageResponseDto;
import com.saju.sajubackend.api.chat.repository.ChatMessageRepository;
import com.saju.sajubackend.api.chat.repository.ChatroomRepository;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.UnAuthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChatHistoryService {

    private final ChatroomRepository chatroomRepository;
    private final ChatMessageRepository chatMessageRepository;

    public List<ChatMessageResponseDto> getChatHistory(String chatroomId, Long memberId) {
        isAuthorized(Long.parseLong(chatroomId), memberId);

        return chatMessageRepository.findByChatroomId(chatroomId)
                .stream()
                .map(ChatMessageResponseDto::fromDocument)
                .toList();
    }

    private void isAuthorized(Long chatroomId, Long memberId) {
        Chatroom chatroom = chatroomRepository.findById(chatroomId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.INVALID_CHAT_ROOM_ID));

        if (isChatMember(chatroom, memberId)) throw new UnAuthorizedException(ErrorMessage.ERR_UNAUTORIZED);
    }

    private boolean isChatMember(Chatroom chatroom, Long memberId) {
        return (chatroom.getMember1().getMemberId() != memberId)
                && (chatroom.getMember2().getMemberId() != memberId);
    }
}
