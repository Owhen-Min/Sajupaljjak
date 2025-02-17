package com.saju.sajubackend.api.board.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record CommentListResponse(
        List<CommentSummary> content,
        boolean hasNext,
        Long nextCursor
) {
    public record CommentSummary(
            Long memberId,
            String nickname,
            String content,
            LocalDateTime createdAt
    ) {}
}