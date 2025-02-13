//package com.saju.sajubackend.api.chat.service;
//
//import com.saju.sajubackend.api.chat.domain.ChatMessage;
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
//import org.springframework.data.redis.connection.stream.MapRecord;
//import org.springframework.data.redis.connection.stream.ObjectRecord;
//import org.springframework.data.redis.connection.stream.StreamOffset;
//import org.springframework.data.redis.connection.stream.StreamReadOptions;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//import reactor.core.publisher.Flux;
//
//import java.time.Duration;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.List;
//import java.util.Map;
//import java.util.Objects;
//import java.util.concurrent.ConcurrentLinkedQueue;
//import java.util.concurrent.atomic.AtomicBoolean;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class ChatMessageEventDrivenService {
//
//    private static final String STREAM_KEY_PREFIX = "chat-stream-";
//    private static final int STREAM_COUNT = 5;
//    private static final int BULK_INSERT_SIZE = 10;
//    private static final int BULK_INSERT_INTERVAL = 5000; // 5초
//
//    private final RedisTemplate<String, Object> redisTemplate;
//    private final ReactiveMongoTemplate reactiveMongoTemplate;
//    private final ConcurrentLinkedQueue<ChatMessage> messageBuffer = new ConcurrentLinkedQueue<>();
//    private final AtomicBoolean isSaving = new AtomicBoolean(false);
//    private long lastInsertTime = System.currentTimeMillis();
//
//    @PostConstruct
//    public void onStartup() {
//        initializeStreams(); // 서비스 시작 시 스트림 자동 생성
//
//        // 스트림마다 컨슈머 실행
//        for (int i = 1; i <= STREAM_COUNT; i++) {
//            int streamIndex = i;
//            new Thread(() -> consumeMessages(streamIndex)).start();
//        }
//    }
//
//    public void initializeStreams() {
//        for (int i = 1; i <= STREAM_COUNT; i++) {
//            ensureStreamExists(i);
//        }
//    }
//
//    public void ensureStreamExists(int streamIndex) {
//        String streamKey = STREAM_KEY_PREFIX + streamIndex;
//        if (!redisTemplate.hasKey(streamKey)) {
//            redisTemplate.opsForStream().add(streamKey, Map.of("init", "true")); // 스트림 생성
//        }
//    }
//
//    public void consumeMessages(int streamIndex) {
//        String streamKey = STREAM_KEY_PREFIX + streamIndex;
//
//        while (true) {
//            // ✅ `MapRecord`로 먼저 읽어오기
//            List<MapRecord<String, String, String>> rawMessages = redisTemplate.opsForStream()
//                    .read(MapRecord.class, StreamReadOptions.empty().count(BULK_INSERT_SIZE).block(Duration.ofMillis(100)),
//                            StreamOffset.fromStart(streamKey));
//
//
//
//            // ✅ `null` 방어 코드 추가
//            if (rawMessages == null || rawMessages.isEmpty()) {
//                continue;
//            }
//
//            // ✅ `ObjectRecord`로 변환
//            List<ObjectRecord<String, Map<String, Object>>> objectMessages = rawMessages.stream()
//                    .map(record -> record.toObjectRecord(Map.class)) // 변환
//                    .collect(Collectors.toList());
//
//            List<ChatMessage> chatMessages = objectMessages.stream()
//                    .map(record -> convertToChatMessage(record.getValue()))
//                    .filter(Objects::nonNull)
//                    .collect(Collectors.toList());
//
//            messageBuffer.addAll(chatMessages);
//            checkAndSave();
//        }
//    }
//
//    @Scheduled(fixedDelay = BULK_INSERT_INTERVAL)
//    public void batchInsertByInterval() {
//        checkAndSave();
//    }
//
//    private synchronized void checkAndSave() {
//        long currentTime = System.currentTimeMillis();
//        if (!messageBuffer.isEmpty() && (messageBuffer.size() >= BULK_INSERT_SIZE || (currentTime - lastInsertTime) >= BULK_INSERT_INTERVAL)) {
//            if (isSaving.compareAndSet(false, true)) { // 저장 중이 아니면 실행
//                saveToMongoDB();
//                lastInsertTime = currentTime;
//                isSaving.set(false); // 저장 완료 후 플래그 해제
//            }
//        }
//    }
//
//    private void saveToMongoDB() {
//        if (messageBuffer.isEmpty()) return;
//
//        List<ChatMessage> batch = messageBuffer.stream().collect(Collectors.toList());
//        messageBuffer.clear();
//
//        Flux.fromIterable(batch)
//                .collectList()
//                .flatMapMany(reactiveMongoTemplate::insertAll)
//                .subscribe();
//    }
//
//    private ChatMessage convertToChatMessage(Map<String, Object> value) {
//        return new ChatMessage(
//                Long.parseLong(value.get("chatroomId").toString()),
//                value.get("content").toString(),
//                Long.parseLong(value.get("senderId").toString()),
//                LocalDateTime.parse(value.get("sendTime").toString(), DateTimeFormatter.ISO_LOCAL_DATE_TIME),
//                value.get("messageType").toString()
//        );
//    }
//}
