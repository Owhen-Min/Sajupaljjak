package com.saju.sajubackend.common.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saju.sajubackend.api.chat.domain.ChatMessage;
import com.saju.sajubackend.api.chat.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final ChatMessageService chatMessageService;
    private final ObjectMapper objectMapper;
    private static final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.put(session.getId(), session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);

        chatMessage.validateMessageType(); // 메시지 타입 유효성 검사

        chatMessageService.save(chatMessage)
                .doOnSuccess(this::broadcastMessage) // 콜백 함수
                .subscribe();
    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session.getId());
    }

    private void broadcastMessage(ChatMessage chatMessage) {
        try {
            String messageJson = objectMapper.writeValueAsString(chatMessage);
            for (WebSocketSession session : sessions.values()) {
                session.sendMessage(new TextMessage(messageJson));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
