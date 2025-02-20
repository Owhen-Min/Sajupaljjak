package com.saju.sajubackend.api.chat.repository;

import com.saju.sajubackend.api.chat.domain.LastMessage;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LastMessageRepository extends MongoRepository<LastMessage, String> {

    default Optional<LastMessage> findLatestByChatroomIdAndMemberId(String chatroomId, String memberId) {
        return findByChatroomIdAndMemberId(
                chatroomId, memberId, PageRequest.of(0, 1, Sort.by("lastMessageTime").descending())
        ).stream().findFirst();
    }

    List<LastMessage> findByChatroomIdAndMemberId(String chatroomId, String memberId, PageRequest pageRequest);
}
