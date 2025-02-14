package com.saju.sajubackend.api.board.repository;

import com.saju.sajubackend.api.board.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

<<<<<<< HEAD
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {
    List<Board> findByMemberMemberId(Long memberId);

=======
public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {
>>>>>>> front
}
