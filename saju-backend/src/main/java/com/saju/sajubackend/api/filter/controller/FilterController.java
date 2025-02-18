package com.saju.sajubackend.api.filter.controller;

import com.saju.sajubackend.api.filter.dto.FilterResponseDto;
import com.saju.sajubackend.api.filter.dto.FilterSaveRequestDto;
import com.saju.sajubackend.api.filter.service.FilterService;
import com.saju.sajubackend.common.jwt.resolver.CurrentMemberId;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class FilterController {

    private final FilterService filterService;

    @PostMapping
    public ResponseEntity<Void> createFilter(@Valid @RequestBody FilterSaveRequestDto request,
                                             @CurrentMemberId Long currentMemberId) {
        filterService.createFilter(request, currentMemberId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/filter")
    public ResponseEntity<FilterResponseDto> getFilter(@CurrentMemberId Long currentMemberId) {
        return ResponseEntity.ok(filterService.getFilter(currentMemberId));
    }

    @PutMapping("/filter")
    public ResponseEntity<Void> updateFilter(@Valid @RequestBody FilterSaveRequestDto request,
                                             @CurrentMemberId Long currentMemberId) {
        filterService.updateFilter(request, currentMemberId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}