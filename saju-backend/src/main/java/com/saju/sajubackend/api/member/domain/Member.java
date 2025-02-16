package com.saju.sajubackend.api.member.domain;

import com.saju.sajubackend.common.converter.*;
import com.saju.sajubackend.common.entity.BaseTimeEntity;
import com.saju.sajubackend.common.enums.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Builder
@ToString
@Table(name = "MEMBER")
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(nullable = false)
    private LocalDate bday;

    @Column(nullable = false, length = 10)
    private LocalDateTime btime;

    @Convert(converter = RelationshipStatusConverter.class)
    private RelationshipStatus relation;

    @Column(nullable = false, length = 30)
    private String nickname;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String intro;

    @Column(name = "profile_img", length = 300)
    private String profileImg;

    private Integer height;

    @Column(name = "city_code")
    private Long cityCode;

    @Column(name = "age")
    private Integer age;

    @Convert(converter = SmokingStatusConverter.class)
    @Column(nullable = false)
    private SmokingStatus smoking;

    @Convert(converter = DrinkingFrequencyConverter.class)
    @Column(nullable = false)
    private DrinkingFrequency drinking;

    @Convert(converter = ReligionConverter.class)
    @Column(nullable = false)
    private Religion religion;

    @Convert(converter = GenderConverter.class)
    @Column(nullable = false)
    private Gender gender;

    @Convert(converter = CelestialStemConverter.class)
    @Column
    private CelestialStem celestialStem;

    public void updateRelationship(RelationshipStatus relation) {
        this.relation = relation;
    }

    // 필터 수정을 위한 update 메서드들
    public void updateSmoking(SmokingStatus smoking) {
        this.smoking = smoking;
    }

    public void updateDrinking(DrinkingFrequency drinking) {
        this.drinking = drinking;
    }

    public void updateReligion(Religion religion) {
        this.religion = religion;
    }
}
