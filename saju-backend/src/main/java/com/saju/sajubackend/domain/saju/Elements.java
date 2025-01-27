package com.saju.sajubackend.domain.saju;

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
@Table(name = "ELEMENTS")
public class Elements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "elements_id")
    private Integer elementsId;

    @Column(nullable = false, length = 10)
    private String element;

    @Builder
    private Elements(Integer elementsId, String element) {
        this.elementsId = elementsId;
        this.element = element;
    }
}
