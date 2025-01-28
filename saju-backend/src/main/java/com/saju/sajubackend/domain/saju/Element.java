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
@Table(name = "ELEMENT")
public class Element {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "element_id")
    private Integer elementId;

    @Column(nullable = false, length = 10)
    private String element;

    @Builder
    private Element(Integer elementId, String element) {
        this.elementId = elementId;
        this.element = element;
    }
}
