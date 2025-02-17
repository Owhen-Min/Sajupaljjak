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
//        if (dayElements.contains(lack)) {
//            // 완벽한 날 -> 하트 -> 어디든 가세요~ -> 둘의 사는 곳 기반으로 장소 추천
//            // 장소 추천 O, 부족원소 그래도 추천?
//        } else if (dayElements.contains(plenty)) {
//            // 조심할 날 -> 세모 -> plenty 라는 원소가 너무 많은 날이에요. 조심하세요
//            // 장소 추천 X
//        } else {
//            // 채워지지않는 날 -> lack 이라는 원소를 대표하는 장소 추천해드릴게요~
//            // 장소 추천 O
//        }

//        List<Place> places;
//        if (dayElements.contains(lack)) {
//            // 완벽한 날 -> 부족 원소(lack)가 이미 포함되어 있으므로, 두 회원의 거주지를 기반으로 장소 추천 진행
//            places = placeRepository.findPlaces(lack.getCode(), fCity, mCity)
//                    .filter(list -> !list.isEmpty())
//                    .orElseGet(() -> placeRepository.findPlacesByElementOnly(lack.getCode()));
//        } else if (dayElements.contains(plenty)) {
//            // 조심할 날 -> 풍부 원소(plenty)가 너무 많은 날이므로, 장소 추천을 하지 않음
//            // 풍부한 원소 제외한 장소 추천
//        } else {
//            // 채워지지 않는 날 -> 부족 원소(lack)를 보충할 수 있는 장소 추천
//            places = placeRepository.findPlacesByElementOnly(lack.getCode());
//        }

        List<Place> places = placeRepository.findPlaces(lack.getCode(), fCity, mCity)
                .filter(list -> !list.isEmpty())
                .orElseGet(() -> placeRepository.findPlacesByElementOnly(lack.getCode()));

        return places.stream()
                .map(PlaceResponseDto::fromEntity)
                .toList();
    }
}
