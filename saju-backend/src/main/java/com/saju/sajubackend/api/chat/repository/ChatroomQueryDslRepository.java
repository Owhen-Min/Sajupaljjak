package com.saju.sajubackend.api.chat.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import static com.saju.sajubackend.api.chat.domain.QChatroom.chatroom;
import static com.saju.sajubackend.api.chat.domain.QChatroomMember.chatroomMember;
import static com.saju.sajubackend.api.member.domain.QMember.member;

import com.saju.sajubackend.api.chat.domain.QChatroom;
import com.saju.sajubackend.api.chat.dto.ChatPartnerDto;
import com.saju.sajubackend.api.member.domain.Member;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class ChatroomQueryDslRepository {

    private final JPAQueryFactory queryFactory;

    public Long findChatroom(Long memberId, Long partnerId) {
        return queryFactory
                .select(chatroom.chatroomId)
                .from(chatroom)
                .where(
                        (chatroom.member1.memberId.eq(memberId)
                                .and(chatroom.member2.memberId.eq(partnerId)))
                                .or(
                                        chatroom.member1.memberId.eq(partnerId)
                                                .and(chatroom.member2.memberId.eq(memberId))
                                )
                )
                .fetchOne();
    }

    public Boolean existChatMember(Long chatroomId, Long memberId) {
        Integer fetchOne = queryFactory
                .selectOne()
                .from(chatroomMember)
                .where(
                        chatroomMember.chatroom.chatroomId.eq(chatroomId),
                        chatroomMember.member.memberId.eq(memberId),
                        chatroomMember.isActive.isTrue()
                )
                .fetchOne();

        return fetchOne != null;
    }

    public Map<Long, Member> findChatPartnersByMemberId(Long memberId) {
        // 활성화된 채팅방 ID 목록 가져오기
        List<Long> activeChatroomIds = findActiveChatrooms(memberId);

        if (activeChatroomIds.isEmpty()) {
            return Map.of(); // 활성화된 채팅방이 없으면 빈 맵 반환
        }

        // 상대방 정보 조회 후 Map<chatroomId, Member>로 변환
        return queryFactory
                .select(chatroom.chatroomId, member)
                .from(chatroom)
                .join(member)
                .on(
                        chatroom.member1.memberId.eq(memberId).and(chatroom.member2.memberId.eq(member.memberId))
                                .or(chatroom.member2.memberId.eq(memberId).and(chatroom.member1.memberId.eq(member.memberId)))
                )
                .where(chatroom.chatroomId.in(activeChatroomIds)) // 활성화된 채팅방만 조회
                .fetch()
                .stream()
                .collect(Collectors.toMap(
                        tuple -> tuple.get(chatroom.chatroomId),
                        tuple -> tuple.get(member)
                ));
    }

    private List<Long> findActiveChatrooms(Long memberId) {
        return queryFactory
                .select(chatroomMember.chatroom.chatroomId)
                .from(chatroomMember)
                .where(chatroomMember.member.memberId.eq(memberId)
                        .and(chatroomMember.isActive.isTrue()))
                .fetch();
    }

    public Long findOpponentMemberId(Long chatroomId, Long memberId) {
        return queryFactory
                .select(
                        chatroom.member1.memberId.when(memberId).then(chatroom.member2.memberId)
                                .otherwise(chatroom.member1.memberId)
                )
                .from(chatroom)
                .where(chatroom.chatroomId.eq(chatroomId))
                .fetchOne();
    }
}
