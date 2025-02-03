package com.saju.sajubackend.api.member.domain;

import com.saju.sajubackend.common.entity.TimeStampedEntity;
import jakarta.persistence.*;
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

    @Convert(converter = GenderConverter.class)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false, length = 30)
    private String email;

    @Builder
    private MemberSocial(Long socialId, Member member, String name, Gender gender, String email) {
        this.socialId = socialId;
        this.member = member;
        this.name = name;
        this.gender = gender;
        this.email = email;
    }
}
