package com.saju.sajubackend.api.match.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/match")
@RestController
public class MatchController {

    @GetMapping("/top")
    public ResponseEntity getBestPartner(Long memberId) { // todo : 나중에 토큰에서 꺼내도록 수정

    }

}
