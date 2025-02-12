package com.saju.sajubackend.common.util;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.StreamRecords;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ChatRedisUtil {

    private final RedisTemplate<String, Object> redisTemplate;

    private static final String STREAM_KEY_PREFIX = "chat-stream-";
    private static final int STREAM_COUNT = 5;

    public void createCache(ChatMessage chatMessage) {
        String streamKey = getStreamKey(chatMessage.getChatroomId());

        Map<String, String> messageMap = new HashMap<>();
        messageMap.put("chatroomId", String.valueOf(chatMessage.getChatroomId()));
        messageMap.put("content", chatMessage.getContent());
        messageMap.put("senderId", String.valueOf(chatMessage.getSenderId()));
        messageMap.put("sendTime", chatMessage.getSendTime().toString());
        messageMap.put("messageType", chatMessage.getMessageType());

        MapRecord<String, String, String> record = StreamRecords.newRecord()
                .ofMap(messageMap)
                .withStreamKey(streamKey);

        redisTemplate.opsForStream().add(record);
    }

    private String getStreamKey(Long chatroomId) {
        return STREAM_KEY_PREFIX + (chatroomId % STREAM_COUNT + 1);
    }
}
