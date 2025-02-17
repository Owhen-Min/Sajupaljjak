package com.saju.sajubackend.api.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatPartnerDto {

    private Long chatroomId;
    private Long memberId;
    private String nickname;
    private String profileImg;
}
