package com.saju.sajubackend.api.chat.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ChatroomLeaveRequestDto {

    @JsonProperty("chatRoomId")
    private Long chatroomId;

    private String lastReadMessage;
}
