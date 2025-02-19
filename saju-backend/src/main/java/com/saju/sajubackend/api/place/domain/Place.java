package com.saju.sajubackend.api.place.domain;

import com.saju.sajubackend.common.converter.ElementConverter;
import com.saju.sajubackend.common.enums.Element;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "place")
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long placeId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 300)
    private String address;

    @Column(name = "city_code", nullable = false)
    private Long cityCode;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Convert(converter = ElementConverter.class)
    @Column(nullable = false)
    private Element element;

    @Column(nullable = false)
    private String image;

    @Builder
    private Place(Long placeId, String name, String address, Long cityCode, String description, Element element, String image) {
        this.placeId = placeId;
        this.name = name;
        this.address = address;
        this.cityCode = cityCode;
        this.description = description;
        this.element = element;
        this.image = image;
    }
}
