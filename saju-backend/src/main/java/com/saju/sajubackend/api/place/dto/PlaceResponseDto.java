package com.saju.sajubackend.api.place.dto;

import com.saju.sajubackend.api.place.domain.Place;

public record PlaceResponseDto(
        Long id,
        String name,
        String region,
        String element,
        String image,
        String description
) {
    public static PlaceResponseDto fromEntity(Place place) {
        return new PlaceResponseDto(
                place.getPlaceId(),
                place.getName(),
                place.getAddress(),
                place.getElement().getLabel(),
                place.getImage(),
                place.getDescription()
        );
    }
}
