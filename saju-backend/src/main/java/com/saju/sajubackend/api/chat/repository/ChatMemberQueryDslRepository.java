package com.saju.sajubackend.api.chat.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import static com.saju.sajubackend.api.chat.domain.QChatroomMember.chatroomMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class ChatMemberQueryDslRepository {

    private final JPAQueryFactory queryFactory;

    public boolean existsByChatroomAndMember(Long chatroomId, Long memberId) {

        Integer fetchOne = queryFactory
                .selectOne()
                .from(chatroomMember)
                .where(
                        chatroomMember.chatroom.chatroomId.eq(chatroomId),
                        chatroomMember.member.memberId.eq(memberId),
                        chatroomMember.isActive.isTrue()
                )
                .fetchFirst();

        return fetchOne != null;
    }
}
