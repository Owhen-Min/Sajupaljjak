package com.saju.sajubackend.api.board.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardCreateRequest {
    private String title;
    private String content;
    // 프론트에서는 문자열(label)로 전달 (예: "기토")
    private String celestialStem;
    private String mainType;
    private String subType;
}
