package com.saju.sajubackend.api.chat.repository;

import com.saju.sajubackend.api.chat.domain.LastMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LastMessageRepository extends MongoRepository<LastMessage, String> {

    Optional<LastMessage> findFirstByChatroomIdAndMemberIdOrderByLastMessageTimeDesc(String chatroomId, String memberId);
}
