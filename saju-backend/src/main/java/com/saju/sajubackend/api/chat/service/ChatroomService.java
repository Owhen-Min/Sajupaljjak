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
import lombok.RequiredArgsConstructor;
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
        // 1. 회원의 모든 채팅 방 + 상대방 정보 구하기
        List<ChatPartnerDto> partners = chatroomQueryDslRepository.findChatPartnersByMemberId(memberId);

        // 2. memberId와 chatroomId로 LastMessage 찾기(몽고 DB LastMessage)
        List<LastMessage> lastMessages = partners.stream()
                .map(partner ->
                        lastMessageRepository.findFirstByChatroomIdAndMemberIdOrderByLastMessageTimeDesc(String.valueOf(partner.getChatroomId()), String.valueOf(memberId))
                                .orElse(null))
                .toList();

        List<ChatroomResponseDto> response = new ArrayList<>();

        // 3. 채팅방별로 읽지 않은 메시지 개수 확인 & 최신 메시지 조회
        for (int i = 0; i < partners.size(); i++) {
            ChatPartnerDto partner = partners.get(i);
            String chatroomId = String.valueOf(partner.getChatroomId());

            LastMessage lastMessage = lastMessages.get(i);
            String lastMessageTime = (lastMessage != null) ? lastMessage.getLastMessageTime() : "1970-01-01T00:00:00";

            // 4. MongoDB에서 읽지 않은 메시지 개수 조회
            long unreadCount = chatMessageRepository.countUnreadMessages(chatroomId, lastMessageTime);

            // 5. 안 읽은 메시지가 있다면 최신 메시지 가져오기
            ChatMessage latestMessage = null;
            if (unreadCount > 0) {
                List<ChatMessage> latestMessages = chatMessageRepository.findLatestMessageByChatroomId(chatroomId, PageRequest.of(0, 1));
                latestMessage = latestMessages.isEmpty() ? null : latestMessages.get(0);
            }

            response.add(new ChatroomResponseDto(
                    partner.getChatroomId(),
                    new PartnerDto(partner.getPartnerId(), partner.getNickname(), partner.getProfileImg(), partner.getCelestialStem()),
                    new MessageDto(
                            latestMessage != null ? latestMessage.getContent() : "",
                            latestMessage != null ? latestMessage.getSendTime() : "",
                            unreadCount
                    )
            ));
        }

        return response;
    }

//    public ChatroomResponseDto updateChatroom(String chatroomId) {
//        // 1. 채팅
//    }
}
