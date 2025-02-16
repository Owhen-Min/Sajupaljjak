package com.saju.sajubackend.api.random.controller;

import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.random.service.RandomService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;

@RequiredArgsConstructor
@Controller
public class RandomController {

    private final RandomService randomService;

    @PostMapping("/api/random")
    @ResponseBody
    public DeferredResult<Map<String, String>> createChatroom(Long memberId) { // todo : accessToken에서 memberId 꺼내기

        DeferredResult<Map<String, String>> deferredResult =
                new DeferredResult<>(10 * 1000L, Map.of("message", "랜덤 채팅 상대를 찾을 수 없습니다"));

        // 랜덤 상대 찾기
        Member member = randomService.join(memberId, deferredResult);

        deferredResult.onError((throwable) -> randomService.delete(member)); // 에러 발생
        deferredResult.onTimeout(() -> randomService.delete(member)); // 타임 아웃 시

        return deferredResult;
    }
}
