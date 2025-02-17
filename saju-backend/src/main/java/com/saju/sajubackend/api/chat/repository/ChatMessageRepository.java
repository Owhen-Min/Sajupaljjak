package com.saju.sajubackend.api.chat.repository;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    List<ChatMessage> findByChatroomId(String chatroomId);

    Optional<ChatMessage> findFirstByChatroomIdOrderBySendTimeDesc(String chatroomId);

    @Query(value = "{ 'chatroomId' : ?0, 'sendTime' : { '$gt' : ?1 } }", count = true)
    long countByChatroomIdAndSendTimeAfter(String chatroomId, String sendTime);

    @Query(value = "{ 'chatroomId' : ?0 }", sort = "{ 'sendTime' : -1 }")
    Optional<ChatMessage> findLatestMessageByChatroomId(String chatroomId);
}

