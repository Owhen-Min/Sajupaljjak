package com.saju.sajubackend.api.saju.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class OpenAiService {
    // RestTemplate은 스프링 프레임워크에서 제공하는 HTTP 클라이언트 템플릿 클래스
    private final RestTemplate restTemplate;
    private final String openAiUrl = "https://api.openai.com/v1/chat/completions";

    // RestTemplateBuilder: RestTemplate을 빌드하는 데 사용.
    public OpenAiService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    // @Value: application.yml에서 설정값을 가져오기 위해 사용.
    @Value("${openai.api-key}")
    private String apiKey;

//    public String getApiKey() {
//        return apiKey;
//    }

    public String generateFortune(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",
                "prompt", prompt,
                "max_tokens", 600
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.exchange(openAiUrl, HttpMethod.POST, request, Map.class);

        if (response.getBody() != null) {
            return ((List<Map<String, Object>>) response.getBody().get("choices")).get(0).get("text").toString();
        }
        return "운세를 가져올 수 없습니다.";
    }
}
