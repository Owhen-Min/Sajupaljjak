package com.saju.sajubackend.api.board.repository;

import com.saju.sajubackend.api.board.domain.Board;
import java.util.List;

public interface BoardRepositoryCustom {
    /**
     * 게시글 목록을 조회한다.
     *
     * @param type   필터링할 mainType (없으면 null)
     * @param query  제목/내용 검색어 (없으면 null)
     * @param cursor 현재 페이지의 마지막 boardId (없으면 null)
     * @param limit  조회할 최대 건수
     * @return 조회된 Board 리스트
     */
    List<Board> searchBoards(String type, String query, Long cursor, int limit);
}
