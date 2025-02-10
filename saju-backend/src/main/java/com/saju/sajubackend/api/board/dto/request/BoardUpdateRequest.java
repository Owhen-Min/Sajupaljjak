package com.saju.sajubackend.api.board.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardUpdateRequest {
    private String title;
    private String content;
}
