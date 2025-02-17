package com.saju.sajubackend.api.couple.domain;

import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "COUPLE")
public class Couple extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "couple_id")
    private Long coupleId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "couple_male_id", nullable = false)
    private Member coupleMale;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "couple_female_id", nullable = false)
    private Member coupleFemale;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Builder
    private Couple(Long coupleId, Member coupleMale, Member coupleFemale, LocalDate startDate) {
        this.coupleId = coupleId;
        this.coupleMale = coupleMale;
        this.coupleFemale = coupleFemale;
        this.startDate = startDate;
    }
}
