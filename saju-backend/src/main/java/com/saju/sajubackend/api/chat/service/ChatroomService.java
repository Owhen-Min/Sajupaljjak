package com.saju.sajubackend.api.chat.service;

import com.saju.sajubackend.api.chat.repository.ChatroomQueryDslRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ChatroomService {

    private final ChatroomQueryDslRepository chatroomQueryDslRepository;

    public Map<String, Long> getChatroom(Long memberId, Long partnerId) {

    }
}
