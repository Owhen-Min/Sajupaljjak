package com.saju.sajubackend.api.chat.dto;

import com.saju.sajubackend.api.member.domain.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.Map;

@Getter
@NoArgsConstructor
public class WaitingDto {

    private Member member;
    private DeferredResult<Map<String, Object>> deferredResult;

    @Builder
    private WaitingDto(Member member, DeferredResult<Map<String, Object>> deferredResult) {
        this.member = member;
        this.deferredResult = deferredResult;
    }
}
