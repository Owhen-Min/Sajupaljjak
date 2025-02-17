//package com.saju.sajubackend.common.util;
//
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.saju.sajubackend.api.chat.domain.ChatMessage;
//import lombok.RequiredArgsConstructor;
//import org.springframework.dao.OptimisticLockingFailureException;
//import org.springframework.data.redis.core.RedisCallback;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.List;
//import java.util.concurrent.TimeUnit;
//
//@Component
//@RequiredArgsConstructor
//public class ChatRedisUtil {
//
//    private final RedisTemplate<String, Object> redisTemplate;
//    private final ObjectMapper objectMapper;
//
//    private static final String REDIS_HASH_KEY = "chatroom";
//    private static final int MAX_RETRY_COUNT = 5;
//
//    public void saveMessages(ChatMessage chatMessage) {
//        int retryCount = 0;
//
//        while (retryCount < MAX_RETRY_COUNT) {
//            retryCount++;
//            try {
//                redisTemplate.execute((RedisCallback<Void>) connection -> {
//                    connection.watch(REDIS_HASH_KEY.getBytes()); // Redis에서 "chatroom" 키 감시
//                    byte[] data = connection.hGet(REDIS_HASH_KEY.getBytes(), chatMessage.getChatroomId().getBytes());
//
//                    // 기존 메시지 리스트 가져오기
//                    List<ChatMessage> messageList;
//                    if (data != null) {
//                        String jsonData = new String(data);
//                        messageList = objectMapper.readValue(jsonData, new TypeReference<>() {});
//                    } else {
//                        messageList = new ArrayList<>();
//                    }
//
//                    // 새 메시지 추가
//                    messageList.add(chatMessage);
//                    String updatedJson = objectMapper.writeValueAsString(messageList);
//
//                    connection.multi(); // 트랜잭션 시작
//                    connection.hSet(REDIS_HASH_KEY.getBytes(), chatMessage.getChatroomId().getBytes(), updatedJson.getBytes());
//                    List<Object> result = connection.exec(); // 트랜잭션 실행
//
//                    if (result == null || result.isEmpty()) {
//                        throw new OptimisticLockingFailureException("Transaction failed, retrying...");
//                    }
//
//                    return null;
//                });
//
//                return; // 트랜잭션 성공 → 재시도 필요 없음
//            } catch (OptimisticLockingFailureException e) {
//                if (retryCount >= MAX_RETRY_COUNT) {
//                    throw new RuntimeException("Failed to save messages after max retries", e);
//                }
//
//                try {
//                    TimeUnit.MILLISECONDS.sleep(50); // 충돌 방지를 위한 짧은 대기 (백오프 적용 가능)
//                } catch (InterruptedException ignored) {
//                }
//            } catch (Exception e) {
//                throw new RuntimeException("Failed to save chat messages to Redis", e);
//            }
//        }
//    }
//
//    public List<ChatMessage> getChatMessages(String chatroomId) {
//        try {
//            Object data = redisTemplate.opsForHash().get(REDIS_HASH_KEY, chatroomId);
//            if (data == null) {
//                return Collections.EMPTY_LIST; // 기존 데이터가 없으면 빈 리스트 반환
//            }
//            return objectMapper.readValue(data.toString(), new TypeReference<>() {});
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to retrieve chat messages from Redis", e);
//        }
//    }
//}
