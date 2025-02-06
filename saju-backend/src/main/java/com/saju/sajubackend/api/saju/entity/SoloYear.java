package com.saju.sajubackend.api.saju.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "year_fortune")
public class SoloYear {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String siju;
    private String ilju;
    private String characteristic;
    private String flow;
    private String danger;
    private String advice;

    // 기본 생성자
    public SoloYear() {}

    // Getter/Setter
    public Long getId() {
        return id;
    }

    public String getSiju() {
        return siju;
    }

    public void setSiju(String siju) {
        this.siju = siju;
    }

    public String getIlju() {
        return ilju;
    }

    public void setIlju(String ilju) {
        this.ilju = ilju;
    }

    public String getCharacteristic() {
        return characteristic;
    }

    public void setCharacteristic(String characteristic) {
        this.characteristic = characteristic;
    }

    public String getFlow() {
        return flow;
    }

    public void setFlow(String flow) {
        this.flow = flow;
    }

    public String getDanger() {
        return danger;
    }

    public void setDanger(String danger) {
        this.danger = danger;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }
}
