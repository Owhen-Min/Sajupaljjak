package com.saju.sajubackend.api.chat.service;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import com.saju.sajubackend.api.chat.domain.Chatroom;
import com.saju.sajubackend.api.chat.domain.ChatroomMember;
import com.saju.sajubackend.api.chat.domain.LastMessage;
import com.saju.sajubackend.api.chat.dto.request.ChatroomLeaveRequestDto;
import com.saju.sajubackend.api.chat.dto.request.ChattingRequestDto;
import com.saju.sajubackend.api.chat.dto.response.ChatroomResponseDto;
import com.saju.sajubackend.api.chat.dto.response.CreateChatroomResponseDto;
import com.saju.sajubackend.api.chat.repository.ChatMessageRepository;
import com.saju.sajubackend.api.chat.repository.ChatroomMemberRespository;
import com.saju.sajubackend.api.chat.repository.ChatroomQueryDslRepository;
import com.saju.sajubackend.api.chat.repository.ChatroomRepository;
import com.saju.sajubackend.api.chat.repository.LastMessageRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.NotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        System.out.println("[🙌 ChatroomId : " + chatroomId + " - ChatroomService.getChatroom()]");

        // 2. 채팅방 생성
        if (chatroomId == null) {
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

    private void validChatroom(String chatroomId, Long memberId) {
        if (chatroomId == null || chatroomId.isEmpty()) {
            throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_CHAT_ROOM);
        }

        if (chatroomQueryDslRepository.existChatMember(Long.parseLong(chatroomId), memberId)) {
            throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_CHAT_ROOM);
        }
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

        System.out.println("[👍채팅방 목록 서비스 - ChatroomService.getAllChatrooms]");
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

    private List<ChatroomResponseDto> buildChatroomResponses(Map<Long, Member> partners,
                                                             Map<Long, LastMessage> lastReadMessages) {
        List<ChatroomResponseDto> response = new ArrayList<>();

        for (Long chatroomId : partners.keySet()) {
            LastMessage lastReadMessage = lastReadMessages.get(chatroomId);
            String lastMessageTime =
                    (lastReadMessage != null) ? lastReadMessage.getLastMessageTime() : "1970-01-01T00:00:00";

            // 읽지 않은 메시지 개수 조회
            long unreadCount = countUnreadMessages(chatroomId, lastMessageTime);

            // 최신 메시지 가져오기 (읽지 않은 메시지가 있을 경우)
            ChatMessage latestMessage = null;
            if (unreadCount > 0) {
                latestMessage = findLatestMessage(chatroomId);
                response.add(
                        ChatroomResponseDto.from(chatroomId, partners.get(chatroomId), latestMessage, unreadCount));
                continue;
            }

            response.add(ChatroomResponseDto.from(chatroomId, partners.get(chatroomId), lastReadMessage, unreadCount));
        }

        return response;
    }

    public ChatroomResponseDto updateChatroom(ChattingRequestDto chatMessage) {
        Member sender = findMember(Long.parseLong(chatMessage.getSenderId()));
        Long receiverId = chatroomQueryDslRepository.findOpponentMemberId(Long.parseLong(chatMessage.getChatroomId()),
                sender.getMemberId());

        if (receiverId == null) {
            throw new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND);
        }

        LastMessage lastReadMessage = lastMessageRepository
                .findFirstByChatroomIdAndMemberIdOrderByLastMessageTimeDesc(
                        chatMessage.getChatroomId(),
                        String.valueOf(receiverId))
                .orElse(null);

        String lastReadTime = (lastReadMessage != null) ? lastReadMessage.getLastMessageTime() : "1970-01-01T00:00:00";

        long newMessageCount = chatMessageRepository.countByChatroomIdAndSendTimeAfter(chatMessage.getChatroomId(),
                lastReadTime);

        return ChatroomResponseDto.from(Long.parseLong(chatMessage.getChatroomId()), sender, chatMessage,
                newMessageCount);
    }
}
