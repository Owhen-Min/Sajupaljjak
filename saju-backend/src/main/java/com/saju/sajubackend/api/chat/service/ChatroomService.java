package com.saju.sajubackend.api.chat.service;

import com.saju.sajubackend.api.chat.domain.Chatroom;
import com.saju.sajubackend.api.chat.domain.ChatroomMember;
import com.saju.sajubackend.api.chat.repository.ChatroomMemberRespository;
import com.saju.sajubackend.api.chat.repository.ChatroomQueryDslRepository;
import com.saju.sajubackend.api.chat.repository.ChatroomRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ChatroomService {

    private final ChatroomQueryDslRepository chatroomQueryDslRepository;
    private final ChatroomRepository chatroomRepository;
    private final ChatroomMemberRespository chatroomMemberRespository;
    private final MemberRepository memberRepository;

    private final String JSON_PROPERTY = "chatRoomId";

    @Transactional
    public Map<String, Long> getChatroom(Long memberId, Long partnerId) {
        // 1. 채팅방이 존재하는지 확인
        Long chatroomId = chatroomQueryDslRepository.findChatroom(memberId, partnerId);

        if (Objects.nonNull(chatroomId)) return Map.of(JSON_PROPERTY, chatroomId);

        // 2. 채팅방 생성
        Member loginMember = findMember(memberId);
        Member matchingMember = findMember(partnerId);

        Chatroom chatroom = saveChatroom(loginMember, matchingMember); // 채팅방 생성

        saveChatroomMember(loginMember, chatroom); // 채팅방 멤버 생성
        saveChatroomMember(matchingMember, chatroom);

        return Map.of(JSON_PROPERTY, chatroom.getChatroomId());
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
}
