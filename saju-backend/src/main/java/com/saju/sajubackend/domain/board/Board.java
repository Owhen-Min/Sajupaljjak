package com.saju.sajubackend.domain.board;

import com.saju.sajubackend.domain.common.BaseTimeEntity;
import com.saju.sajubackend.domain.member.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "BOARD")
public class Board extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "main_type", nullable = false, length = 100)
    private String mainType;

    @Column(name = "sub_type", nullable = false, length = 100)
    private String subType;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Builder
    private Board(Long boardId, Member member, String mainType, String subType, String title, String content) {
        this.boardId = boardId;
        this.member = member;
        this.mainType = mainType;
        this.subType = subType;
        this.title = title;
        this.content = content;
    }
}
