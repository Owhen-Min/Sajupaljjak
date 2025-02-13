package com.saju.sajubackend.api.chat.repository;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@RequiredArgsConstructor
@Repository
public class ChatMessageRepository {

    private final ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<ChatMessage> getMessages(String chatroomId) {
        Query query = new Query(Criteria.where("chatroomId").is(chatroomId))
                .with(Sort.by(Sort.Direction.ASC, "sendTime"));

        System.out.println("#########" + query);
        return reactiveMongoTemplate.find(query, ChatMessage.class);
    }
}

