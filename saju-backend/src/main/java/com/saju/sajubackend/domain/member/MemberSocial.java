package com.saju.sajubackend.domain.member;

import com.saju.sajubackend.domain.common.TimeStampedEntity;
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
@Table(name = "MEMBER_SOCIAL")
public class MemberSocial extends TimeStampedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "social_id")
    private Long socialId;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false, length = 15)
    private String gender;

    @Column(nullable = false, length = 30)
    private String email;

    @Builder
    private MemberSocial(Long socialId, Member member, String name, String gender, String email) {
        this.socialId = socialId;
        this.member = member;
        this.name = name;
        this.gender = gender;
        this.email = email;
    }
}
