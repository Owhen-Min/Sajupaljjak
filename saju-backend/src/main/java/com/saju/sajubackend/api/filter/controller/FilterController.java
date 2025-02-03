package com.saju.sajubackend.api.filter.controller;

import com.saju.sajubackend.api.filter.dto.FilterSaveRequestDto;
import com.saju.sajubackend.api.filter.service.FilterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class FilterController {

    private final FilterService filterService;

    @PostMapping
    public ResponseEntity<Void> createFilter(@Valid @RequestBody FilterSaveRequestDto request,
                                            Long memberId) { // todo : 토큰에서 memberId 꺼내기
        filterService.createFilter(request, memberId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
