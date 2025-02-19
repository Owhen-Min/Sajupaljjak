package com.saju.sajubackend.api.place.repository;

import com.saju.sajubackend.api.place.domain.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long>, PlaceCustomRepository {
}