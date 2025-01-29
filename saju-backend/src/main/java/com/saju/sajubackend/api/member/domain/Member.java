package com.saju.sajubackend.api.member.domain;

import com.saju.sajubackend.api.filter.domain.Drinking;
import com.saju.sajubackend.api.filter.domain.Religion;
import com.saju.sajubackend.api.filter.domain.Smoking;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "MEMBER")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(nullable = false)
    private LocalDate bday;

    @Column(nullable = false, length = 10)
    private String btime;

    @Column(name = "is_couple", nullable = false, length = 15)
    private String isCouple;

    @Column(nullable = false, length = 30)
    private String nickname;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String intro;

    @Column(name = "profile_img", length = 300)
    private String profileImg;

    private Integer height;

    @Column(name = "city_code")
    private Integer cityCode;

    @OneToOne
    @JoinColumn(name = "smoking_id")
    private Smoking smoking;

    @OneToOne
    @JoinColumn(name = "drinking_id")
    private Drinking drinking;

    @OneToOne
    @JoinColumn(name = "religion_id")
    private Religion religion;

    @Builder
    private Member(Long memberId, LocalDate bday, String btime, String isCouple, String nickname, String intro,
                  String profileImg, Integer height, Integer cityCode, Smoking smoking, Drinking drinking,
                  Religion religion) {
        this.memberId = memberId;
        this.bday = bday;
        this.btime = btime;
        this.isCouple = isCouple;
        this.nickname = nickname;
        this.intro = intro;
        this.profileImg = profileImg;
        this.height = height;
        this.cityCode = cityCode;
        this.smoking = smoking;
        this.drinking = drinking;
        this.religion = religion;
    }
}
