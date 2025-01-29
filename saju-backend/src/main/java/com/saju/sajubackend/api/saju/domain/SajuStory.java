package com.saju.sajubackend.api.saju.domain;

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
@Table(name = "SAJU_STORY")
public class SajuStory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "saju_story_id")
    private Long sajuStoryId;

    @OneToOne
    @JoinColumn(name = "saju_id", nullable = false)
    private Saju saju;

    @Column(name = "lifelong_luck", nullable = false, columnDefinition = "TEXT")
    private String lifelongLuck;

    @Column(name = "rhyme_analysis", nullable = false, columnDefinition = "TEXT")
    private String rhymeAnalysis;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String heyday;

    @Column(name = "be_careful", nullable = false, columnDefinition = "TEXT")
    private String beCareful;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String advice;

    @Builder
    private SajuStory(Long sajuStoryId, Saju saju, String lifelongLuck, String rhymeAnalysis, String heyday,
                     String beCareful, String advice) {
        this.sajuStoryId = sajuStoryId;
        this.saju = saju;
        this.lifelongLuck = lifelongLuck;
        this.rhymeAnalysis = rhymeAnalysis;
        this.heyday = heyday;
        this.beCareful = beCareful;
        this.advice = advice;
    }
}

