package com.saju.sajubackend.api.saju.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.saju.domain.Saju;
import com.saju.sajubackend.api.saju.dto.SajuDetailResponse;
import com.saju.sajubackend.api.saju.dto.SajuResponse;
import com.saju.sajubackend.api.saju.repository.SajuRepository;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class SajuService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final SajuRepository sajuRepository;
    private final MemberRepository memberRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${openai.api-key}")
    private String openAiApiKey;
    private static final String MODEL = "gpt-4o-mini";

    // Redis 캐시 키: 회원 ID별 캐시 생성
    private String getDailyKey(Long memberId) {
        return "saju:daily:" + memberId;
    }

    private String getTodayDetailKey(Long memberId) {
        return "saju:today:" + memberId;
    }

    // 회원의 사주 정보를 활용해 오늘의 운세(간단 버전) 조회
    public SajuResponse getDailySajuForMember(Long memberId) {
        String redisKey = getDailyKey(memberId);
        ValueOperations<String, Object> ops = redisTemplate.opsForValue();
        Object cached = ops.get(redisKey);
        if (cached != null) {
            try {
                return objectMapper.readValue(cached.toString(), SajuResponse.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        // Member 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException(ErrorMessage.MEMBER_NOT_FOUND.getMessage()));
        // 해당 회원의 Saju 정보를 DB에서 조회
        Saju saju = sajuRepository.findByMember(member)
                .orElseThrow(() -> new RuntimeException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL.getMessage()));

        // 프롬프트 생성 (StringBuilder 사용)
        StringBuilder promptBuilder = new StringBuilder();
        promptBuilder.append("오늘의 운세(사주)는 일주가 ");
        promptBuilder.append(saju.getDaily());
        promptBuilder.append("인, 월주가 ");
        promptBuilder.append(saju.getMonthly());
        promptBuilder.append("인, 년주가 ");
        promptBuilder.append(saju.getYearly());
        promptBuilder.append("인, 시주가 ");
        promptBuilder.append(saju.getTimely());
        promptBuilder.append("인 사람의 오늘의 운세(사주)를 알려줘. 응답은 아래 JSON 형식으로 보내줘.\n");
        promptBuilder.append("형식: { \"content\": \"운세 내용\" }");
        String prompt = promptBuilder.toString();

        SajuResponse response = callGptForDailySaju(prompt);
        long secondsUntilMidnight = calculateSecondsUntilMidnight();
        try {
            String json = objectMapper.writeValueAsString(response);
            ops.set(redisKey, json, secondsUntilMidnight, TimeUnit.SECONDS);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return response;
    }

    // 회원의 사주 정보를 활용해 오늘의 운세(상세 버전) 조회
    public SajuDetailResponse getTodaySajuDetailForMember(Long memberId) {
        String redisKey = getTodayDetailKey(memberId);
        ValueOperations<String, Object> ops = redisTemplate.opsForValue();
        Object cached = ops.get(redisKey);
        if (cached != null) {
            try {
                return objectMapper.readValue(cached.toString(), SajuDetailResponse.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        Saju saju = sajuRepository.findByMember(member)
                .orElseThrow(() -> new RuntimeException("Saju 정보가 없습니다."));

        // 프롬프트 생성 (StringBuilder 사용)
        StringBuilder promptBuilder = new StringBuilder();
        promptBuilder.append("오늘의 운세(사주) 상세 정보는 일주가 ");
        promptBuilder.append(saju.getDaily());
        promptBuilder.append("인, 월주가 ");
        promptBuilder.append(saju.getMonthly());
        promptBuilder.append("인, 년주가 ");
        promptBuilder.append(saju.getYearly());
        promptBuilder.append("인, 시주가 ");
        promptBuilder.append(saju.getTimely());
        promptBuilder.append("인 사람의 오늘의 운세(사주) 상세를 알려줘. 응답은 아래 JSON 형식으로 보내줘.\n");
        promptBuilder.append("{\n");
        promptBuilder.append("  \"totalScore\": 숫자,\n");
        promptBuilder.append("  \"wealthScore\": 숫자,\n");
        promptBuilder.append("  \"healthScore\": 숫자,\n");
        promptBuilder.append("  \"loveScore\": 숫자,\n");
        promptBuilder.append("  \"studyScore\": 숫자,\n");
        promptBuilder.append("  \"content\": {\n");
        promptBuilder.append("    \"total\": \"운세 총평\",\n");
        promptBuilder.append("    \"wealth\": \"재물운\",\n");
        promptBuilder.append("    \"love\": \"연애운\",\n");
        promptBuilder.append("    \"health\": \"건강운\",\n");
        promptBuilder.append("    \"study\": \"학업운\"\n");
        promptBuilder.append("  }\n");
        promptBuilder.append("}\n");
        promptBuilder.append("반드시 위 형식의 JSON으로만 응답해줘.");
        String prompt = promptBuilder.toString();

        SajuDetailResponse response = callGptForTodaySajuDetail(prompt);
        long secondsUntilMidnight = calculateSecondsUntilMidnight();
        try {
            String json = objectMapper.writeValueAsString(response);
            ops.set(redisKey, json, secondsUntilMidnight, TimeUnit.SECONDS);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return response;
    }

    // OpenAI API 호출 (간단 운세 버전)
    private SajuResponse callGptForDailySaju(String prompt) {
        WebClient webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + openAiApiKey)
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
            return objectMapper.readValue(content, SajuResponse.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("OpenAI API 호출 실패");
        }
    }

    // OpenAI API 호출 (상세 운세 버전)
    private SajuDetailResponse callGptForTodaySajuDetail(String prompt) {
        WebClient webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + openAiApiKey)
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

    // 현재 시간부터 다음 자정까지 남은 초 계산
    private long calculateSecondsUntilMidnight() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime midnight = now.plusDays(1).with(LocalTime.MIDNIGHT);
        return Duration.between(now, midnight).getSeconds();
    }
}
