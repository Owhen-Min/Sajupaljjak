package com.saju.sajubackend.api.board.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record BoardDetailResponse(
        Long boardId,
        Long memberId,
        String mainType,
        String subType,
        String celestialStem,
        String title,
        String content,
        int likeCount,
        boolean isLiked,
        LocalDateTime createdAt,
        List<CommentResponse> comments
) {
    public record CommentResponse(
            Long memberId,
            String nickname,
            String content,
            LocalDateTime createdAt
    ) {}
}
