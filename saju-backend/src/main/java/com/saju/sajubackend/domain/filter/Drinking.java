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
@Table(name = "DRINKING")
public class Drinking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "drinking_id")
    private Integer drinkingId;

    @Column(nullable = false, length = 30)
    private String type;

    @Builder
    private Drinking(Integer drinkingId, String type) {
        this.drinkingId = drinkingId;
        this.type = type;
    }
}
