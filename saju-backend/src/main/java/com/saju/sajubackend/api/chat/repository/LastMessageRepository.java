package com.saju.sajubackend.api.chat.repository;

import com.saju.sajubackend.api.chat.domain.LastMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LastMessageRepository extends MongoRepository<LastMessage, String> {
}
