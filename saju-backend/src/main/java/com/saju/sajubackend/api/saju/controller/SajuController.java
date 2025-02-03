package com.saju.sajubackend.api.saju.controller;

import com.saju.sajubackend.api.filter.dto.FilterSaveRequestDto;
import com.saju.sajubackend.api.filter.service.FilterService;
import com.saju.sajubackend.api.saju.service.SajuService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/fortune")
public class SajuController {
    private final SajuService sajuService;

    @Autowired
    public SajuController(SajuService sajuService) {
        this.sajuService = sajuService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getFortune() {
        String content = sajuService.getFortune();
        Map<String, Object> response = Map.of("status", 200, "data", Map.of("content", content));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/today")
    public ResponseEntity<Map<String, Object>> getDetailedFortune() {
        Map<String, Object> data = sajuService.getDetailedFortune();
        Map<String, Object> response = Map.of("status", 200, "data", data);
        return ResponseEntity.ok(response);
    }
}
