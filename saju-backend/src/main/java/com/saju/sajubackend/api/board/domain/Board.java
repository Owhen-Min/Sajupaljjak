package com.saju.sajubackend.api.board.domain;

import com.saju.sajubackend.common.entity.BaseTimeEntity;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.enums.Element;
import com.saju.sajubackend.common.enums.CelestialStem;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
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

    @Convert(converter = com.saju.sajubackend.common.converter.ElementConverter.class)
    @Column(name = "main_type", nullable = false)
    private Element mainType;

    @Convert(converter = com.saju.sajubackend.common.converter.CelestialStemConverter.class)
    @Column(name = "sub_type", nullable = false)
    private CelestialStem subType;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Builder
    private Board(Long boardId, Member member, Element mainType, CelestialStem subType, String title, String content) {
        this.boardId = boardId;
        this.member = member;
        this.mainType = mainType;
        this.subType = subType;
        this.title = title;
        this.content = content;
    }

    // 게시글 수정을 위한 메서드
    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
