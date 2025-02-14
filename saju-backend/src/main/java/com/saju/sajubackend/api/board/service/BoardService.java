package com.saju.sajubackend.api.board.service;

import com.saju.sajubackend.api.board.domain.Board;
import com.saju.sajubackend.api.board.domain.Comment;
import com.saju.sajubackend.api.board.dto.request.BoardCreateRequest;
import com.saju.sajubackend.api.board.dto.request.BoardUpdateRequest;
import com.saju.sajubackend.api.board.dto.response.BoardCreateResponse;
import com.saju.sajubackend.api.board.dto.response.BoardDetailResponse;
import com.saju.sajubackend.api.board.dto.response.BoardListResponse;
<<<<<<< HEAD
import com.saju.sajubackend.api.board.dto.response.CommentListResponse;
=======
>>>>>>> front
import com.saju.sajubackend.api.board.repository.BoardRepository;
import com.saju.sajubackend.api.board.repository.CommentRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.saju.domain.Saju;
import com.saju.sajubackend.api.saju.repository.SajuRepository;
import com.saju.sajubackend.common.enums.CelestialStem;
import com.saju.sajubackend.common.enums.Element;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final SajuRepository sajuRepository;
    private final MemberRepository memberRepository;


    public BoardService(BoardRepository boardRepository, CommentRepository commentRepository, SajuRepository sajuRepository, MemberRepository memberRepository) {
        this.boardRepository = boardRepository;
        this.commentRepository = commentRepository;
        this.sajuRepository = sajuRepository;
        this.memberRepository = memberRepository;
    }

    /**
     * 게시글 목록 조회 (무한 스크롤)
     * - 최초 요청(cursor null) 시 10개, 이후 5개씩 로드
     */
    @Transactional(readOnly = true)
    public BoardListResponse getBoardList(String type, Long cursor, String query) {
        int pageSize = (cursor == null) ? 10 : 5;
        // 다음 페이지 여부를 판단하기 위해 pageSize+1개를 조회
        List<Board> boards = boardRepository.searchBoards(type, query, cursor, pageSize + 1);

        boolean hasNext = boards.size() > pageSize;
        Long nextCursor = null;
        if (hasNext) {
            // extra 데이터 제거 후 마지막 board의 boardId를 nextCursor로 지정
            Board extraBoard = boards.remove(boards.size() - 1);
            nextCursor = extraBoard.getBoardId();
        }

        // DTO 매핑
        List<BoardListResponse.BoardSummary> content = boards.stream().map(board -> {
            // Saju 정보 조회: daily 필드의 label을 가져옴
            Optional<Saju> sajuOpt = sajuRepository.findByMember(board.getMember());
            String celestialStemLabel = sajuOpt.map(saju -> saju.getDaily()).orElse("");

            int commentCount = commentRepository.countByBoard(board);
            int likeCount = 0; // 좋아요 기능이 있다면 별도 조회

            return new BoardListResponse.BoardSummary(
                    board.getBoardId(),
                    board.getMainType().getLabel(),    // Element enum의 label (예: "금")
                    board.getSubType().getLabel(),     // CelestialStem enum의 label (예: "경금")
                    celestialStemLabel,                // Saju.daily의 label (예: "기토")
                    board.getTitle(),
                    board.getContent(),
                    likeCount,
                    commentCount,
                    board.getCreatedAt()
            );
        }).collect(Collectors.toList());

        return new BoardListResponse(content, hasNext, nextCursor);
    }

    /**
     * 특정 게시글 조회
     *
     * @param boardId         조회할 게시글 id
     * @param currentMemberId 현재 로그인한 회원 id (좋아요 여부 판단 등)
     * @return BoardDetailResponse DTO
     */
    @Transactional(readOnly = true)
    public BoardDetailResponse getBoardDetail(Long boardId, Long currentMemberId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        Optional<Saju> sajuOpt = sajuRepository.findByMember(board.getMember());
        String celestialStem = sajuOpt
                .map(saju -> saju.getDaily())
                .orElse("");
        int likeCount = 0;  // 좋아요 기능이 있다면 좋아요 수 조회
        boolean isLiked = false;  // currentMemberId와 좋아요 테이블을 활용해 여부 판단

        // 댓글 조회 (생성시간 오름차순)
        List<Comment> comments = commentRepository.findByBoardOrderByCreatedAtAsc(board);
        List<BoardDetailResponse.CommentResponse> commentResponses = comments.stream().map(comment -> {
            return new BoardDetailResponse.CommentResponse(
                    comment.getMember().getMemberId(),
                    comment.getMember().getNickname(),  // Member 엔티티에 getNickname()이 있다고 가정
                    comment.getContent(),
                    comment.getCreatedAt()
            );
        }).collect(Collectors.toList());

        return new BoardDetailResponse(
                board.getBoardId(),
                board.getMember().getMemberId(),
                board.getMainType().getLabel(),    // 예: "금"
                board.getSubType().getLabel(),     // 예: "경금"
                sajuOpt.map(saju -> saju.getDaily()).orElse(""),  // 예: "기토"
                board.getTitle(),
                board.getContent(),
                likeCount,
                isLiked,
                board.getCreatedAt(),
                commentResponses
        );
    }

    /**
     * 게시글 작성
     * @param memberId 현재 로그인한 회원 아이디
     * @param mainTypeLabel 요청 쿼리 파라미터로 전달된 mainType label (예: "화")
     * @param request 작성 요청 DTO (title, content, celestialStem label)
     * @return 생성된 게시글의 boardId를 담은 응답 DTO
     */
    @Transactional
    public BoardCreateResponse createBoard(Long memberId, String mainTypeLabel, BoardCreateRequest request) {
        // Element는 mainType, CelestialStem은 subType으로 사용
        Element mainType = Element.fromLabel(mainTypeLabel);
        CelestialStem subType = CelestialStem.fromLabel(request.getCelestialStem());

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Board board = Board.builder()
                .member(member)
                .mainType(mainType)
                .subType(subType)
                .title(request.getTitle())
                .content(request.getContent())
                .build();
        boardRepository.save(board);
        return new BoardCreateResponse(board.getBoardId());
    }

    /**
     * 게시글 수정
     */
    @Transactional
    public void updateBoard(Long memberId, Long boardId, BoardUpdateRequest request) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));
        // 작성자 확인
        if (!board.getMember().getMemberId().equals(memberId)) {
            throw new RuntimeException("Not authorized to update this board");
        }
        board.update(request.getTitle(), request.getContent());
        // JPA의 Dirty Checking으로 자동 업데이트됨.
    }

    /**
     * 게시글 삭제
     */
    @Transactional
    public void deleteBoard(Long memberId, Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));
        if (!board.getMember().getMemberId().equals(memberId)) {
            throw new RuntimeException("Not authorized to delete this board");
        }
        boardRepository.delete(board);
    }

    /**
     * 댓글 작성
     */
    @Transactional
    public void createComment(Long memberId, Long boardId, String content) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Comment comment = Comment.builder()
                .board(board)
                .member(member)
                .content(content)
                .build();
        commentRepository.save(comment);
    }
<<<<<<< HEAD

    // ──────────────────────────────────────────────
    // 신규 메서드: 내가 쓴 게시물 조회
    // ──────────────────────────────────────────────

    /**
     * 내가 쓴 게시물 조회
     * 현재 회원이 작성한 게시글을 조회하여 BoardListResponse DTO로 반환합니다.
     *
     * @param memberId 현재 로그인한 회원 id
     * @return BoardListResponse DTO (내가 쓴 게시물 목록)
     */
    @Transactional(readOnly = true)
    public BoardListResponse getMyBoardList(Long memberId) {
        // 회원이 작성한 게시물 조회: board.member.memberId == memberId
        List<Board> boards = boardRepository.findByMemberMemberId(memberId);

        // DTO 매핑
        List<BoardListResponse.BoardSummary> content = boards.stream().map(board -> {
            Optional<Saju> sajuOpt = sajuRepository.findByMember(board.getMember());
            String celestialStemLabel = sajuOpt.map(saju -> saju.getDaily()).orElse("");
            int commentCount = commentRepository.countByBoard(board);
            int likeCount = 0;
            return new BoardListResponse.BoardSummary(
                    board.getBoardId(),
                    board.getMainType().getLabel(),
                    board.getSubType().getLabel(),
                    celestialStemLabel,
                    board.getTitle(),
                    board.getContent(),
                    likeCount,
                    commentCount,
                    board.getCreatedAt()
            );
        }).collect(Collectors.toList());

        // 단순 조회이므로 페이징 처리는 생략 (hasNext=false, nextCursor=null)
        return new BoardListResponse(content, false, null);
    }

    // ──────────────────────────────────────────────
    // 신규 메서드: 내가 쓴 댓글 조회
    // ──────────────────────────────────────────────

    /**
     * 내가 쓴 댓글 조회
     * 현재 회원이 작성한 댓글을 조회하여 CommentListResponse DTO로 반환합니다.
     *
     * @param memberId 현재 로그인한 회원 id
     * @return CommentListResponse DTO (내가 쓴 댓글 목록)
     */
    @Transactional(readOnly = true)
    public CommentListResponse getMyCommentList(Long memberId) {
        // 회원이 작성한 댓글 조회: comment.member.memberId == memberId
        List<Comment> comments = commentRepository.findByMemberMemberId(memberId);
        List<CommentListResponse.CommentSummary> content = comments.stream().map(comment ->
                new CommentListResponse.CommentSummary(
                        comment.getMember().getMemberId(),
                        comment.getMember().getNickname(),
                        comment.getContent(),
                        comment.getCreatedAt()
                )
        ).collect(Collectors.toList());

        return new CommentListResponse(content, false, null);
    }
=======
>>>>>>> front
}
