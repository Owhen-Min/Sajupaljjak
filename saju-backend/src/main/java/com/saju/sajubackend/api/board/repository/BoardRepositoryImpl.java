package com.saju.sajubackend.api.board.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saju.sajubackend.api.board.domain.Board;
import static com.saju.sajubackend.api.board.domain.QBoard.board;

import com.saju.sajubackend.api.board.domain.QBoard;
import org.springframework.util.StringUtils;
import java.util.List;

public class BoardRepositoryImpl implements BoardRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BoardRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<Board> searchBoards(String type, String query, Long cursor, int limit) {
        QBoard board = QBoard.board;
        BooleanBuilder builder = new BooleanBuilder();

        // 타입 필터 (필요 시 사용)
        if (StringUtils.hasText(type)) {
            // mainType의 문자열 값에 type이 포함되는지 필터 (원하는 방식으로 수정 가능)
            builder.and(board.mainType.stringValue().containsIgnoreCase(type));
        }

        // 제목 또는 내용 검색어 필터
        if (StringUtils.hasText(query)) {
            builder.and(board.title.containsIgnoreCase(query)
                    .or(board.content.containsIgnoreCase(query)));
        }

        // 커서 기반 페이징: cursor가 제공되면 boardId가 cursor보다 작은 게시글 조회
        if (cursor != null && cursor > 0) {
            builder.and(board.boardId.lt(cursor));
        }

        return queryFactory.selectFrom(board)
                .where(builder)
                .orderBy(board.boardId.desc())
                .limit(limit)
                .fetch();
    }
}
