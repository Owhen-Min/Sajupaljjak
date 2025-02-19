package com.saju.sajubackend.api.random.controller;

import com.saju.sajubackend.api.chat.dto.request.ChattingRequestDto;
import com.saju.sajubackend.api.chat.dto.response.CreateChatroomResponseDto;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.random.service.RandomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.Map;

@RequiredArgsConstructor
@Controller
public class RandomController {

    private final RandomService randomService;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/api/random")
    @ResponseBody
    public DeferredResult<Map<String, String>> createChatroom(Long memberId) { // todo : accessToken에서 memberId 꺼내기

        DeferredResult<Map<String, String>> deferredResult =
                new DeferredResult<>(10 * 1000L, Map.of("message", "랜덤 채팅 상대를 찾을 수 없습니다."));

        // 랜덤 상대 찾기
        Member member = randomService.join(memberId, deferredResult);

        deferredResult.onError((throwable) -> randomService.delete(member)); // 에러 발생
        deferredResult.onTimeout(() -> randomService.delete(member)); // 타임 아웃 시

        return deferredResult;
    }

    @PostMapping("/api/random/{partnerId}")
    @ResponseBody
    public ResponseEntity<CreateChatroomResponseDto> liked(@PathVariable Long partnerId,
                                                           Long memberId) {
        return ResponseEntity.ok().body(randomService.liked(memberId, partnerId));
    }

    @MessageMapping("/random")
    public void sendMessage(@Payload ChattingRequestDto request) {
        ChattingRequestDto chatting = randomService.send(request);
        messagingTemplate.convertAndSend("/topic/random/" + chatting.getChatroomId(), chatting);
    }

    @MessageMapping("/random/leave")
    public void exit(@Payload ChattingRequestDto request) {
        randomService.exit(request);
        messagingTemplate.convertAndSend("/topic/random/" + request.getChatroomId(),
                Map.of("message", "상대방이 채팅을 종료했습니다."));
    }
}
