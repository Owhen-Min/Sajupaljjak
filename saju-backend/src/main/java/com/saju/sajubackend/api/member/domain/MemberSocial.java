package com.saju.sajubackend.api.member.domain;

import com.saju.sajubackend.common.entity.TimeStampedEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@ToString
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

    @Column(nullable = false, length = 30)
    private String email;

    @Builder
    private MemberSocial(Long socialId, Member member, String name, String email) {
        this.socialId = socialId;
        this.member = member;
        this.name = name;
        this.email = email;
    }
}
