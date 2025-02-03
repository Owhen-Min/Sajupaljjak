package com.saju.sajubackend.api.saju.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;

@Service
public class SajuService {
    private final RedisTemplate<String, Object> redisTemplate;
    private final OpenAiService openAiService;

    @Autowired
    public SajuService(RedisTemplate<String, Object> redisTemplate, OpenAiService openAiService) {
        this.redisTemplate = redisTemplate;
        this.openAiService = openAiService;
    }

    public String getFortune() {
        String key = "fortune:today";
        ValueOperations<String, Object> ops = redisTemplate.opsForValue();

        // Redis에서 데이터 조회
        String cachedData = (String) ops.get(key);
        if (cachedData != null) {
            return cachedData;
        }

        // 캐시에 없으면 OpenAI 호출
        String prompt = "오늘의 운세를 한 문장으로 알려줘.";
        String fortune = openAiService.generateFortune(prompt);

        // Redis에 저장 (1일 동안 유지)
        ops.set(key, fortune, Duration.ofDays(1));
        return fortune;
    }

    public Map<String, Object> getDetailedFortune() {
        String key = "fortune:details";
        ValueOperations<String, Object> ops = redisTemplate.opsForValue();

        // Redis에서 데이터 조회
        Map<String, Object> cachedData = (Map<String, Object>) ops.get(key);
        if (cachedData != null) {
            return cachedData;
        }

        // 캐시에 없으면 OpenAI 호출
        String prompt = "오늘의 운세를 상세하게 총운, 금전운, 사랑운, 건강운, 학업운 포함해서 JSON 형태로 알려줘.";
        String response = openAiService.generateFortune(prompt);

        // JSON 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> fortuneDetails;
        try {
            fortuneDetails = objectMapper.readValue(response, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("OpenAI 응답 파싱 실패", e);
        }

        // Redis에 저장 (1일 동안 유지)
        ops.set(key, fortuneDetails, Duration.ofDays(1));
        return fortuneDetails;
    }
}

