package com.saju.sajubackend.api.board.repository;

import com.saju.sajubackend.api.board.domain.Comment;
import com.saju.sajubackend.api.board.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    int countByBoard(Board board);

    // 댓글은 생성시간 오름차순 정렬하여 조회
    List<Comment> findByBoardOrderByCreatedAtAsc(Board board);
<<<<<<< HEAD
    List<Comment> findByMemberMemberId(Long memberId);
=======
>>>>>>> front
}
