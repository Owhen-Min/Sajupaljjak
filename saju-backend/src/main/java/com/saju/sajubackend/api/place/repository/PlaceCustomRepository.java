package com.saju.sajubackend.api.place.repository;

import com.saju.sajubackend.api.place.domain.Place;

import java.util.List;
import java.util.Optional;

public interface PlaceCustomRepository {
    Optional<List<Place>> findPlaces(int element, Long fCity, Long mCity);

    List<Place> findPlacesByElementOnly(int element);
}
