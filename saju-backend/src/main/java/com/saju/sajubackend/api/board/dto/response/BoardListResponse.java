package com.saju.sajubackend.api.board.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record BoardListResponse(
        List<BoardSummary> content,
        boolean hasNext,
        Long nextCursor
) {
    public record BoardSummary(
            Long boardId,
            String mainType,
            String subType,
            String celestialStem,
            String title,
            String content,
            int likeCount,
            int commentCount,
            LocalDateTime createdAt
    ) {}
}
