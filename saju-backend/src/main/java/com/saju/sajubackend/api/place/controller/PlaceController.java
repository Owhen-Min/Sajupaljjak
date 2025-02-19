package com.saju.sajubackend.api.place.controller;

import com.saju.sajubackend.api.place.dto.PlaceRequestDto;
import com.saju.sajubackend.api.place.dto.PlaceResponseDto;
import com.saju.sajubackend.api.place.service.PlaceService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/places")
@RestController
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping
    public ResponseEntity<List<PlaceResponseDto>> getPlaces(
            PlaceRequestDto placeRequestDto,
            @CurrentMemberId Long currentMemberId) {

        return ResponseEntity.ok(placeService.getPlaceList(placeRequestDto.date(), currentMemberId));
    }
}