package com.saju.sajubackend.api.place.controller;

import com.saju.sajubackend.api.place.dto.PlaceResponseDto;
import com.saju.sajubackend.api.place.service.PlaceService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/places")
@RestController
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping
    public ResponseEntity<List<PlaceResponseDto>> getPlaces(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer day,
            @CurrentMemberId Long currentMemberId) {

        // 날짜가 없으면 오늘 날짜 사용
        LocalDate date = (month != null && day != null) ?
                LocalDate.of(LocalDate.now().getYear(), month, day) :
                LocalDate.now();

        return ResponseEntity.ok(placeService.getPlaceList(date, currentMemberId));
    }
}