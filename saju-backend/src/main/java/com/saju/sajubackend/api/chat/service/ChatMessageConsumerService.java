package com.saju.sajubackend.api.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saju.sajubackend.api.chat.domain.ChatMessage;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.redis.connection.stream.*;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatMessageConsumerService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ReactiveMongoTemplate mongoTemplate;
    private final ObjectMapper objectMapper;

    private static final int STREAM_COUNT = 5; // ✅ 스트림 개수
    private static final int BULK_INSERT_SIZE = 10; // ✅ 일정 개수 이상 쌓이면 MongoDB에 저장
    private static final long BULK_INSERT_INTERVAL = 5000L; // ✅ 5초마다 MongoDB에 저장
    private static final String STREAM_KEY_PREFIX = "chat-stream-";

    // ✅ 스트림별 메시지 버퍼 (MongoDB 저장 대기)
    private final Map<String, List<ChatMessage>> messageBuffers = new ConcurrentHashMap<>();

    @PostConstruct
    public void startConsumers() {
        for (int i = 1; i <= STREAM_COUNT; i++) {
            int streamIndex = i;
            String streamKey = STREAM_KEY_PREFIX + streamIndex;
            messageBuffers.put(streamKey, new ArrayList<>()); // ✅ 스트림별 버퍼 생성

            Thread consumerThread = new Thread(() -> consumeMessages(streamKey));
            consumerThread.setDaemon(true); // ✅ 백그라운드에서 실행
            consumerThread.start();
        }
    }

    private void consumeMessages(String streamKey) {
        while (true) {
            try {
                // ✅ 블로킹 방식으로 Redis Streams에서 메시지 읽기 (메시지가 없으면 대기)
                List<ObjectRecord<String, Map<String, String>>> records = redisTemplate.opsForStream()
                        .read(ObjectRecord.class,
                                StreamReadOptions.empty()
                                        .count(BULK_INSERT_SIZE) // ✅ 일정 개수만큼 가져옴
                                        .block(Duration.ofMillis(-1)), // ✅ 새로운 메시지가 올 때까지 대기
                                StreamOffset.create(streamKey, ReadOffset.lastConsumed()));

                if (records != null && !records.isEmpty()) {
                    List<ChatMessage> messageBuffer = messageBuffers.get(streamKey);
                    for (ObjectRecord<String, Map<String, String>> record : records) {
                        ChatMessage chatMessage = objectMapper.convertValue(record.getValue(), ChatMessage.class);
                        messageBuffer.add(chatMessage); // ✅ 버퍼에 추가
                    }

                    // ✅ 일정 개수 이상 쌓이면 MongoDB에 저장
                    if (messageBuffer.size() >= BULK_INSERT_SIZE) {
                        flushMessagesToMongo(streamKey);
                    }
                }
            } catch (Exception e) {
                log.error("{}에서 메시지 소비 중 오류 발생", streamKey, e);
            }
        }
    }

    // ✅ 5초마다 실행 → 버퍼에 남아있는 메시지를 MongoDB로 이동
    @Scheduled(fixedRate = BULK_INSERT_INTERVAL)
    public void flushAllMessagesToMongo() {
        messageBuffers.forEach(this::flushMessagesToMongo);
    }

    // ✅ 특정 스트림의 메시지들을 MongoDB에 저장
    private void flushMessagesToMongo(String streamKey) {
        List<ChatMessage> messageBuffer = messageBuffers.get(streamKey);
        if (messageBuffer.isEmpty()) {
            return; // ✅ 저장할 메시지가 없으면 종료
        }

        mongoTemplate.insertAll(new ArrayList<>(messageBuffer)).subscribe(result ->
                log.info("{}에서 {}개의 메시지를 MongoDB에 저장", streamKey, messageBuffer.size())
        );
        messageBuffer.clear(); // ✅ 저장 후 버퍼 비우기
    }
}
