package com.saju.sajubackend.domain.saju;

import com.saju.sajubackend.domain.member.Member;
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
@Table(name = "SAJU")
public class Saju {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "saju_id")
    private Long sajuId;

    @OneToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

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
}

