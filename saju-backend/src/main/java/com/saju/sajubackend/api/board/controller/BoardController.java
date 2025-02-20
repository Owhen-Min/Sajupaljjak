package com.saju.sajubackend.api.board.controller;

import com.saju.sajubackend.api.board.dto.request.BoardCreateRequest;
import com.saju.sajubackend.api.board.dto.request.BoardUpdateRequest;
import com.saju.sajubackend.api.board.dto.request.CommentCreateRequest;
import com.saju.sajubackend.api.board.dto.response.BoardCreateResponse;
import com.saju.sajubackend.api.board.dto.response.BoardDetailResponse;
import com.saju.sajubackend.api.board.dto.response.BoardListResponse;
import com.saju.sajubackend.api.board.dto.response.CommentListResponse;
import com.saju.sajubackend.api.board.service.BoardService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

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
     * <p>
     * currentMemberId는 좋아요 여부를 판단하기 위한 값으로,
     * 별도 인증 처리가 있다면 SecurityContext에서 추출하도록 변경 가능함.
     */
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardDetailResponse> getBoardDetail(
            @PathVariable Long boardId,
            @CurrentMemberId Long currentMemberId
    ) {
        BoardDetailResponse response = boardService.getBoardDetail(boardId, currentMemberId);
        return ResponseEntity.ok(response);
    }

    /**
     * 게시글 작성
     * URL 예시: POST /api/community
     * 여기서 type은 mainType(Element)의 label을 의미 (예: "화")
     */
    @PostMapping
    public ResponseEntity<BoardCreateResponse> createBoard(
            @RequestBody BoardCreateRequest request,
            @CurrentMemberId Long currentMemberId) {

        BoardCreateResponse response = boardService.createBoard(currentMemberId, request);
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
            @CurrentMemberId Long currentMemberId) {

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
            @CurrentMemberId Long currentMemberId) {

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
            @CurrentMemberId Long currentMemberId) {

        boardService.createComment(currentMemberId, boardId, request.getContent());
        return ResponseEntity.ok().build();
    }

    /**
     * [내가 쓴 게시물 조회]
     * GET /api/community/my-post
     */
    @GetMapping("/my-post")
    public ResponseEntity<BoardListResponse> getMyPosts(@CurrentMemberId Long currentMemberId) {
        BoardListResponse response = boardService.getMyBoardList(currentMemberId);
        return ResponseEntity.ok(response);
    }

    /**
     * [내가 쓴 댓글 조회]
     * GET /api/community/my-comment
     */
    @GetMapping("/my-comment")
    public ResponseEntity<CommentListResponse> getMyComments(@CurrentMemberId Long currentMemberId) {
        CommentListResponse response = boardService.getMyCommentList(currentMemberId);
        return ResponseEntity.ok(response);
    }
}
