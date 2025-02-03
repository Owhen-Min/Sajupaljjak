package com.saju.sajubackend.api.member.domain;

import com.saju.sajubackend.api.filter.domain.*;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private LocalDateTime btime;

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

    @Convert(converter = SmokingStatusConverter.class)
    @Column(nullable = false)
    private SmokingStatus smoking;

    @Convert(converter = DrinkingFrequencyConverter.class)
    @Column(nullable = false)
    private DrinkingFrequency drinking;

    @Convert(converter = ReligionConverter.class)
    @Column(nullable = false)
    private Religion religion;

    @Builder
    private Member(Long memberId, LocalDate bday, LocalDateTime btime, String isCouple, String nickname, String intro, String profileImg, Integer height, Integer cityCode, SmokingStatus smoking, DrinkingFrequency drinking, Religion religion) {
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
