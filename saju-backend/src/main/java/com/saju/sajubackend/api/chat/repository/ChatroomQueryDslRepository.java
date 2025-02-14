package com.saju.sajubackend.api.chat.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import static com.saju.sajubackend.api.chat.domain.QChatroom.chatroom;
import static com.saju.sajubackend.api.chat.domain.QChatroomMember.chatroomMember;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
}
