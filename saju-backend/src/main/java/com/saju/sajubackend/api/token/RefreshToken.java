package com.saju.sajubackend.api.token;


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
@Table(name = "REFRESH_TOKEN")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refresh_token_id")
    private Long refreshTokenId;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "refresh_token", nullable = false, length = 300)
    private String refreshToken;

    @Builder
    private RefreshToken(Long refreshTokenId, Member member, String refreshToken) {
        this.refreshTokenId = refreshTokenId;
        this.member = member;
        this.refreshToken = refreshToken;
    }

    // ✅ 🔥 추가할 메서드 (refreshToken 업데이트)
    public void updateRefreshToken(String newToken) {
        this.refreshToken = newToken;
    }
}
