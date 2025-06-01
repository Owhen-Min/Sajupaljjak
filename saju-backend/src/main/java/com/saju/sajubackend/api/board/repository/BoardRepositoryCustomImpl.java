package com.saju.sajubackend.api.board.repository;

import com.saju.sajubackend.api.board.domain.Board;
import com.saju.sajubackend.common.enums.Element;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class BoardRepositoryCustomImpl implements BoardRepositoryCustom {

    private final EntityManager em;

    public BoardRepositoryCustomImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Board> searchBoards(String type, String query, Long cursor, int limit) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Board> cq = cb.createQuery(Board.class);
        Root<Board> board = cq.from(Board.class);

        // 동적 조건 생성
        List<Predicate> predicates = new ArrayList<>();

        // type 필터 (mainType)
        if (StringUtils.hasText(type)) {
            // 전달받은 label(예: "금")을 Element enum으로 변환
            Element element = Element.fromLabel(type);
            predicates.add(cb.equal(board.get("mainType"), element));
        }

        // query 필터 (title 또는 content에 포함)
        if (StringUtils.hasText(query)) {
            Predicate titleLike = cb.like(board.get("title"), "%" + query + "%");
            Predicate contentLike = cb.like(board.get("content"), "%" + query + "%");
            predicates.add(cb.or(titleLike, contentLike));
        }

        // cursor 기반 조회 (boardId가 cursor보다 작은 것)
        if (cursor != null) {
            predicates.add(cb.lessThan(board.get("boardId"), cursor));
        }

        cq.where(predicates.toArray(new Predicate[0]));

        // 최신 게시글부터 내림차순 정렬 (boardId descending)
        cq.orderBy(cb.desc(board.get("boardId")));

        TypedQuery<Board> typedQuery = em.createQuery(cq);
        typedQuery.setMaxResults(limit);

        return typedQuery.getResultList();
    }
}
