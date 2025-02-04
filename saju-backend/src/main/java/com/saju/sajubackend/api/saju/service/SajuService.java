package com.saju.sajubackend.api.saju.service;
// 패키지: com.example.saju.service


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.saju.sajubackend.api.saju.dto.SajuDetailResponse;
import com.saju.sajubackend.api.saju.dto.SajuResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class SajuService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    // Redis 캐시 키 (하루 캐시)
    private static final String DAILY_SAJU_KEY = "saju:daily";
    private static final String TODAY_SAJU_KEY = "saju:today";

    private ObjectMapper objectMapper = new ObjectMapper();

    @Value("${openai.api-key}")
    private String OPENAI_API_KEY;

    private static final String MODEL = "gpt-4o-mini";

    // 간단한 사주(운세) 조회: Redis 캐시가 있으면 반환, 없으면 OpenAI API 호출 후 캐싱
    public SajuResponse getDailySaju() {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        String cached = ops.get(DAILY_SAJU_KEY);
        if (cached != null) {
            try {
                return objectMapper.readValue(cached, SajuResponse.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        SajuResponse response = callGptForDailySaju();
        long secondsUntilMidnight = calculateSecondsUntilMidnight();
        try {
            String json = objectMapper.writeValueAsString(response);
            ops.set(DAILY_SAJU_KEY, json, secondsUntilMidnight, TimeUnit.SECONDS);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return response;
    }

    // 오늘의 상세 사주(운세) 조회: Redis 캐시 여부 확인 후 반환
    public SajuDetailResponse getTodaySajuDetail() {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        String cached = ops.get(TODAY_SAJU_KEY);
        if (cached != null) {
            try {
                return objectMapper.readValue(cached, SajuDetailResponse.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        SajuDetailResponse response = callGptForTodaySajuDetail();
        long secondsUntilMidnight = calculateSecondsUntilMidnight();
        try {
            String json = objectMapper.writeValueAsString(response);
            ops.set(TODAY_SAJU_KEY, json, secondsUntilMidnight, TimeUnit.SECONDS);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return response;
    }

    // 현재 시간부터 다음 자정까지 남은 초 계산
    private long calculateSecondsUntilMidnight() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime midnight = now.plusDays(1).with(LocalTime.MIDNIGHT);
        return Duration.between(now, midnight).getSeconds();
    }

    // OpenAI API를 호출하여 간단한 사주 결과를 받아오는 메서드 (실제 호출)
    private SajuResponse callGptForDailySaju() {
        // OpenAI API에 보낼 프롬프트: 반드시 JSON 형식의 응답을 요청
        String prompt = "오늘의 운세(사주)를 알려줘. 응답은 아래 JSON 형식으로 보내줘.\n" +
                "형식: { \"content\": \"운세 내용\" }";

        WebClient webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + OPENAI_API_KEY)
                .build();

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", MODEL);
        payload.put("temperature", 0.7);

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);
        messages.add(message);
        payload.put("messages", messages);

        String responseBody = webClient.post()
                .uri("/chat/completions")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            // 응답 JSON에서 choices[0].message.content 추출 후 SajuResponse로 파싱
            JsonNode root = objectMapper.readTree(responseBody);
            String content = root.path("choices").get(0).path("message").path("content").asText();
            return objectMapper.readValue(content, SajuResponse.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("OpenAI API 호출 실패");
        }
    }

    // OpenAI API를 호출하여 오늘의 상세 사주 결과를 받아오는 메서드 (실제 호출)
    private SajuDetailResponse callGptForTodaySajuDetail() {
        // 프롬프트: JSON 형식 응답을 요청 (정해진 형식대로)
        String prompt = "오늘의 운세(사주) 상세 정보를 알려줘. 응답은 아래 JSON 형식으로 보내줘.\n" +
                "{\n" +
                "  \"totalScore\": 숫자,\n" +
                "  \"wealthScore\": 숫자,\n" +
                "  \"healthScore\": 숫자,\n" +
                "  \"loveScore\": 숫자,\n" +
                "  \"studyScore\": 숫자,\n" +
                "  \"content\": {\n" +
                "    \"total\": \"운세 총평\",\n" +
                "    \"wealth\": \"재물운\",\n" +
                "    \"love\": \"연애운\",\n" +
                "    \"health\": \"건강운\",\n" +
                "    \"study\": \"학업운\"\n" +
                "  }\n" +
                "}\n" +
                "반드시 위 형식의 JSON으로만 응답해줘.";

        WebClient webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + OPENAI_API_KEY)
                .build();

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", MODEL);
        payload.put("temperature", 0.7);

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);
        messages.add(message);
        payload.put("messages", messages);

        String responseBody = webClient.post()
                .uri("/chat/completions")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            JsonNode root = objectMapper.readTree(responseBody);
            String content = root.path("choices").get(0).path("message").path("content").asText();
            return objectMapper.readValue(content, SajuDetailResponse.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("OpenAI API 호출 실패");
        }
    }
}