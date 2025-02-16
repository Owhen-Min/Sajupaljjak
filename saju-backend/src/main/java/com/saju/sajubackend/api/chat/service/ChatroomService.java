package com.saju.sajubackend.api.chat.service;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import com.saju.sajubackend.api.chat.domain.Chatroom;
import com.saju.sajubackend.api.chat.domain.ChatroomMember;
import com.saju.sajubackend.api.chat.domain.LastMessage;
import com.saju.sajubackend.api.chat.dto.ChatPartnerDto;
import com.saju.sajubackend.api.chat.dto.request.ChatroomLeaveRequestDto;
import com.saju.sajubackend.api.chat.dto.response.ChatroomResponseDto;
import com.saju.sajubackend.api.chat.dto.response.CreateChatroomResponseDto;
import com.saju.sajubackend.api.chat.repository.*;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.NotFoundException;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ChatroomService {

    private final ChatroomQueryDslRepository chatroomQueryDslRepository;
    private final ChatroomRepository chatroomRepository;
    private final ChatroomMemberRespository chatroomMemberRespository;
    private final MemberRepository memberRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final LastMessageRepository lastMessageRepository;

    @Transactional
    public CreateChatroomResponseDto getChatroom(Long memberId, Long partnerId) {
        // 1. 채팅방이 존재하는지 확인
        Long chatroomId = chatroomQueryDslRepository.findChatroom(memberId, partnerId);
        Member loginMember = findMember(memberId);
        Member matchingMember = findMember(partnerId);

        // 2. 채팅방 생성
        if (Objects.isNull(chatroomId)) {
            Chatroom chatroom = saveChatroom(loginMember, matchingMember); // 채팅방 생성
            chatroomId = chatroom.getChatroomId();

            saveChatroomMember(loginMember, chatroom); // 채팅방 멤버 생성
            saveChatroomMember(matchingMember, chatroom);
        }

        return CreateChatroomResponseDto.fromEntity(chatroomId, loginMember, matchingMember);
    }

    private void saveChatroomMember(Member member, Chatroom chatroom) {
        ChatroomMember chatroomMember = ChatroomMember.builder()
                .chatroom(chatroom)
                .member(member)
                .isActive(true)
                .build();

        chatroomMemberRespository.save(chatroomMember);
    }

    private Chatroom saveChatroom(Member member1, Member member2) {
        Chatroom chatroom = Chatroom.builder()
                .member1(member1)
                .member2(member2)
                .build();
        return chatroomRepository.save(chatroom);
    }

    private Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));
    }

    public void leave(ChatroomLeaveRequestDto request, Long memberId) {
        // 1. 유효성 검증
        validChatroom(request.getChatroomId(), memberId);

        // 2. 마지막 메시지 찾고 몽고DB에 저장
        chatMessageRepository.findFirstByChatroomIdOrderBySendTimeDesc(String.valueOf(request.getChatroomId()))
                .ifPresent(lastMessage -> {
                    lastMessageRepository.save(createLastMessage(lastMessage, memberId));
                });
    }

    private void validChatroom(Long chatroomId, Long memberId) {
        if (chatroomQueryDslRepository.existChatMember(chatroomId, memberId))
            throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_CHAT_ROOM);
    }

    private LastMessage createLastMessage(ChatMessage chatMessage, Long memberId) {
        return LastMessage.builder()
                .chatroomId(chatMessage.getChatroomId())
                .memberId(String.valueOf(memberId))
                .lastMessageId(chatMessage.getId())
                .lastMessageTime(chatMessage.getSendTime())
                .content(chatMessage.getContent())
                .build();
    }

    public List<ChatroomResponseDto> getAllChatrooms(Long memberId) {
        // 1. 채팅 상대방 정보 구하기
        Map<Long, Member> partners = chatroomQueryDslRepository.findChatPartnersByMemberId(memberId);

        // 2. 회원별 마지막 읽은 메시지 조회 (몽고 DB LastMessage)
        Map<Long, LastMessage> lastReadMessages = findLastReadMessages(partners, memberId);

        // 3. 채팅방 응답 리스트 생성
        return buildChatroomResponses(partners, lastReadMessages);
    }

    private Map<Long, LastMessage> findLastReadMessages(Map<Long, Member> partners, Long memberId) {
        return partners.keySet().stream()
                .map(chatroomId -> Map.entry(chatroomId, lastMessageRepository
                        .findFirstByChatroomIdAndMemberIdOrderByLastMessageTimeDesc(
                                String.valueOf(chatroomId), String.valueOf(memberId))
                        .orElse(null)))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    private long countUnreadMessages(Long chatroomId, String lastMessageTime) {
        return chatMessageRepository.countByChatroomIdAndSendTimeAfter(String.valueOf(chatroomId), lastMessageTime);
    }

    private ChatMessage findLatestMessage(Long chatroomId) {
        return chatMessageRepository.findLatestMessageByChatroomId(String.valueOf(chatroomId)).orElse(null);
    }

    private List<ChatroomResponseDto> buildChatroomResponses(Map<Long, Member> partners, Map<Long, LastMessage> lastReadMessages) {
        List<ChatroomResponseDto> response = new ArrayList<>();

        for (Long chatroomId : partners.keySet()) {
            LastMessage lastReadMessage = lastReadMessages.get(chatroomId);
            String lastMessageTime = (lastReadMessage != null) ? lastReadMessage.getLastMessageTime() : "1970-01-01T00:00:00";

            // 읽지 않은 메시지 개수 조회
            long unreadCount = countUnreadMessages(chatroomId, lastMessageTime);

            // 최신 메시지 가져오기 (읽지 않은 메시지가 있을 경우)
            ChatMessage latestMessage = null;
            if (unreadCount > 0) {
                latestMessage = findLatestMessage(chatroomId);
                response.add(ChatroomResponseDto.from(chatroomId, partners.get(chatroomId), latestMessage, unreadCount));
                continue;
            }

            response.add(ChatroomResponseDto.from(chatroomId, partners.get(chatroomId), lastReadMessage, unreadCount));
        }

        return response;
    }


//    public ChatroomResponseDto updateChatroom(String chatroomId) {
//        // 1. 채팅
//    }
}
