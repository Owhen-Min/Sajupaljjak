package com.saju.sajubackend.api.chat.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatroomLeaveRequestDto {

    private String chatRoomId;

    private String lastReadMessage;
}
