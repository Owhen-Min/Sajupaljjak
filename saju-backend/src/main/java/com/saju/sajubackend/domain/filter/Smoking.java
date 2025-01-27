package com.saju.sajubackend.domain.filter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "SMOKING")
public class Smoking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "smoking_id")
    private Integer smokingId;

    @Column(nullable = false, length = 30)
    private String type;

    @Builder
    private Smoking(Integer smokingId, String type) {
        this.smokingId = smokingId;
        this.type = type;
    }
}
