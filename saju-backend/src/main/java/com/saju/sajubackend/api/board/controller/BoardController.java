package com.saju.sajubackend.api.board.controller;

import com.saju.sajubackend.api.board.dto.request.BoardCreateRequest;
import com.saju.sajubackend.api.board.dto.request.BoardUpdateRequest;
import com.saju.sajubackend.api.board.dto.request.CommentCreateRequest;
import com.saju.sajubackend.api.board.dto.response.BoardCreateResponse;
import com.saju.sajubackend.api.board.dto.response.BoardDetailResponse;
import com.saju.sajubackend.api.board.dto.response.BoardListResponse;
import com.saju.sajubackend.api.board.service.BoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/community")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    /**
     * 게시글 목록 조회 API (무한 스크롤)
     * URL 예시: /api/community?type=화&cursor=17&query=검색내용
     */
    @GetMapping
    public ResponseEntity<BoardListResponse> getBoardList(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long cursor,
            @RequestParam(required = false) String query
    ) {
        BoardListResponse response = boardService.getBoardList(type, cursor, query);
        return ResponseEntity.ok(response);
    }

    /**
     * 특정 게시글 상세 조회 API
     * URL 예시: /api/community/{boardId}
     *
     * currentMemberId는 좋아요 여부를 판단하기 위한 값으로,
     * 별도 인증 처리가 있다면 SecurityContext에서 추출하도록 변경 가능함.
     */
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardDetailResponse> getBoardDetail(
            @PathVariable Long boardId,
            @RequestParam(required = false) Long currentMemberId
    ) {
        BoardDetailResponse response = boardService.getBoardDetail(boardId, currentMemberId);
        return ResponseEntity.ok(response);
    }

    /**
     * 게시글 작성
     * URL 예시: POST /api/community?type=화
     * 여기서 type은 mainType(Element)의 label을 의미 (예: "화")
     */
    @PostMapping
    public ResponseEntity<BoardCreateResponse> createBoard(
            @RequestParam("type") String type,
            @RequestBody BoardCreateRequest request,
            @RequestHeader("Authorization") String authToken) {

        // 실제 서비스에서는 authToken을 통해 currentMemberId를 추출합니다.
        Long currentMemberId = 1L; // 테스트용 고정값

        BoardCreateResponse response = boardService.createBoard(currentMemberId, type, request);
        return ResponseEntity.ok(response);
    }

    /**
     * 게시글 수정
     * URL 예시: PUT /api/community/{boardId}
     */
    @PutMapping("/{boardId}")
    public ResponseEntity<Void> updateBoard(
            @PathVariable Long boardId,
            @RequestBody BoardUpdateRequest request,
            @RequestHeader("Authorization") String authToken) {

        Long currentMemberId = 1L; // 테스트용
        boardService.updateBoard(currentMemberId, boardId, request);
        return ResponseEntity.ok().build();
    }

    /**
     * 게시글 삭제
     * URL 예시: DELETE /api/community/{boardId}
     */
    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteBoard(
            @PathVariable Long boardId,
            @RequestHeader("Authorization") String authToken) {

        Long currentMemberId = 1L; // 테스트용
        boardService.deleteBoard(currentMemberId, boardId);
        return ResponseEntity.ok().build();
    }

    /**
     * 댓글 작성
     * URL 예시: POST /api/community/{boardId}/reply
     */
    @PostMapping("/{boardId}/reply")
    public ResponseEntity<Void> createComment(
            @PathVariable Long boardId,
            @RequestBody CommentCreateRequest request,
            @RequestHeader("Authorization") String authToken) {

        Long currentMemberId = 1L; // 테스트용
        boardService.createComment(currentMemberId, boardId, request.getContent());
        return ResponseEntity.ok().build();
    }
}
