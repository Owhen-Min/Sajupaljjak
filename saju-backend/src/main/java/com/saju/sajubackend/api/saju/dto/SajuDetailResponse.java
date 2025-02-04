package com.saju.sajubackend.api.saju.dto;

public class SajuDetailResponse {
    private int totalScore; // 총운 점수
    private int wealthScore; // 금전운 점수
    private int healthScore; // 건강운 점수
    private int loveScore; // 애정운 점수
    private int studyScore; // 학업운 점수
    private SajuContent content; // 각 운의 상세 점수

    public int getTotalScore() {
        return totalScore;
    }
    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }
    public int getWealthScore() {
        return wealthScore;
    }
    public void setWealthScore(int wealthScore) {
        this.wealthScore = wealthScore;
    }
    public int getHealthScore() {
        return healthScore;
    }
    public void setHealthScore(int healthScore) {
        this.healthScore = healthScore;
    }
    public int getLoveScore() {
        return loveScore;
    }
    public void setLoveScore(int loveScore) {
        this.loveScore = loveScore;
    }
    public int getStudyScore() {
        return studyScore;
    }
    public void setStudyScore(int studyScore) {
        this.studyScore = studyScore;
    }
    public SajuContent getContent() {
        return content;
    }
    public void setContent(SajuContent content) {
        this.content = content;
    }
}
