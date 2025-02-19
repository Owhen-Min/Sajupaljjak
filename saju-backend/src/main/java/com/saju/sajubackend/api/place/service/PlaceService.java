package com.saju.sajubackend.api.place.service;

import com.saju.sajubackend.api.couple.domain.Couple;
import com.saju.sajubackend.api.couple.repository.CoupleRepository;
import com.saju.sajubackend.api.place.domain.Place;
import com.saju.sajubackend.api.place.dto.PlaceResponseDto;
import com.saju.sajubackend.api.place.repository.PlaceRepository;
import com.saju.sajubackend.common.enums.Element;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.NotFoundException;
import com.saju.sajubackend.common.util.ElementCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final CoupleRepository coupleRepository;

    @Transactional(readOnly = true)
    public List<PlaceResponseDto> getPlaceList(LocalDate date, Long memberId) {
        Couple couple = coupleRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.COUPLE_NOT_FOUND));

        Long fCity = ((couple.getCoupleFemale().getCityCode()) / 100000000L) * 100000000L;
        Long mCity = ((couple.getCoupleMale().getCityCode()) / 100000000L) * 100000000L;

        Element lack = couple.getLackElement();
        Element plenty = couple.getPlentyElement();

        // 그 날의 원소 반환
        List<Element> dayElements = ElementCalculator.getDayElements(date);

        List<Place> places = dayElements.contains(plenty)
                ? placeRepository.findPlacesExceptElement(plenty.getCode(), fCity, mCity)
                .filter(list -> !list.isEmpty())
                .orElseGet(() -> placeRepository.findPlacesByElementOnly(lack.getCode()))
                : placeRepository.findPlaces(lack.getCode(), fCity, mCity)
                .filter(list -> !list.isEmpty())
                .orElseGet(() -> placeRepository.findPlacesByElementOnly(lack.getCode()));

        return places.stream()
                .map(PlaceResponseDto::fromEntity)
                .toList();
    }
}
