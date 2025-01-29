package com.saju.sajubackend.api.couple.domain;

import com.saju.sajubackend.common.entity.BaseTimeEntity;
import com.saju.sajubackend.api.member.domain.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "COUPLE")
public class Couple extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "couple_id")
    private Long coupleId;

    @OneToOne
    @JoinColumn(name = "couple_male_id", nullable = false)
    private Member coupleMale;

    @OneToOne
    @JoinColumn(name = "couple_female_id", nullable = false)
    private Member coupleFemale;

    @Builder
    private Couple(Long coupleId, Member coupleMale, Member coupleFemale) {
        this.coupleId = coupleId;
        this.coupleMale = coupleMale;
        this.coupleFemale = coupleFemale;
    }
}
