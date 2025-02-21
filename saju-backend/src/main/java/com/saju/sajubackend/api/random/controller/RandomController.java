package com.saju.sajubackend.api.random.controller;

import com.saju.sajubackend.api.chat.dto.request.ChattingRequestDto;
import com.saju.sajubackend.api.chat.dto.response.CreateChatroomResponseDto;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.random.service.RandomService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
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
    public DeferredResult<Map<String, Object>> createChatroom(@CurrentMemberId Long memberId) {
        DeferredResult<Map<String, Object>> deferredResult =
                new DeferredResult<>(5 * 1000L, Map.of("message", "랜덤 채팅 상대를 찾을 수 없습니다."));

        // 랜덤 상대 찾기 (비동기 처리)
        randomService.join(memberId, deferredResult).thenAccept(matchingInfo -> {
            if (matchingInfo != null) {
                deferredResult.setResult(Map.of("parnter", matchingInfo, "chatRoomId", "408")); // 매칭된 정보 반환
            } else {
                deferredResult.setResult(Map.of("message", "랜덤 채팅 상대를 찾을 수 없습니다."));
            }
        });

        // 에러 및 타임아웃 처리
        deferredResult.onError((throwable) -> randomService.delete(memberId));
        deferredResult.onTimeout(() -> randomService.delete(memberId));

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
