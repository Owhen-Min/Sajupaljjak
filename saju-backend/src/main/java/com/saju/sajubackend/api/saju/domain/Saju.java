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
    @Column(name = "daily", nullable = false, length = 30)
    private String daily;

    @Column(name = "monthly", nullable = false, length = 30)
    private String monthly;

    @Column(name = "yearly", nullable = false, length = 30)
    private String yearly;

    @Column(name = "timely", nullable = false, length = 30)
    private String timely;

    @Builder
    private Saju(Long sajuId, Member member, String daily, String monthly, String yearly, String timely) {
        this.sajuId = sajuId;
        this.member = member;
        this.daily = daily;
        this.monthly = monthly;
        this.yearly = yearly;
        this.timely = timely;
    }

    // 기존 Saju 정보 업데이트 메서드 추가
    public void updateSaju(String daily, String monthly, String yearly, String timely) {
        this.daily = daily;
        this.monthly = monthly;
        this.yearly = yearly;
        this.timely = timely;
    }


}

