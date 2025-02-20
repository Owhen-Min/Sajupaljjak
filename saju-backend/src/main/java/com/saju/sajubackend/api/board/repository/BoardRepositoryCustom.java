package com.saju.sajubackend.api.board.repository;

import com.saju.sajubackend.api.board.domain.Board;
import java.util.List;

public interface BoardRepositoryCustom {
    /**
     * 커서 기반 무한 스크롤을 위한 게시글 검색
     * @param type   (선택) 게시글의 타입 (필요 시 필터링)
     * @param query  (선택) 제목 또는 내용에 포함된 검색어
     * @param cursor (선택) 이전 페이지의 마지막 boardId (null이면 첫 페이지)
     * @param limit  조회할 최대 건수 (pageSize + 1)
     * @return 조건에 맞는 Board 목록
     */
    List<Board> searchBoards(String type, String query, Long cursor, int limit);
}
