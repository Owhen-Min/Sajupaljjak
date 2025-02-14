package com.saju.sajubackend.api.chat.repository;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    List<ChatMessage> findByChatroomId(String chatroomId);

    Optional<ChatMessage> findFirstByChatroomIdOrderBySendTimeDesc(String chatroomId);

    @Query("{ 'chatroomId': ?0, 'sendTime': { $gt: ?1 } }")
    long countUnreadMessages(String chatroomId, String lastMessageTime);

    @Query(value = "{ 'chatroomId' : ?0 }", sort = "{ 'sendTime' : -1 }")
    List<ChatMessage> findLatestMessageByChatroomId(String chatroomId, Pageable pageable);
}

