package com.saju.sajubackend.api.saju.domain;

import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.converter.CelestialStemConverter;
import com.saju.sajubackend.common.enums.CelestialStem;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "SAJU")
public class Saju {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "saju_id")
    private Long sajuId;

    @OneToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // daily 값을 정수로 저장, 프론트에는 enum label(예, "기토") 전달
    @Convert(converter = CelestialStemConverter.class)
    @Column(name = "daily", nullable = false)
    private CelestialStem daily;

    @Column(name = "monthly", nullable = false, length = 30)
    private String monthly;

    @Column(name = "yearly", nullable = false, length = 30)
    private String yearly;

    @Column(name = "timely", nullable = false, length = 30)
    private String timely;

    @Builder
    private Saju(Long sajuId, Member member, CelestialStem daily, String monthly, String yearly, String timely) {
        this.sajuId = sajuId;
        this.member = member;
        this.daily = daily;
        this.monthly = monthly;
        this.yearly = yearly;
        this.timely = timely;
    }
}

