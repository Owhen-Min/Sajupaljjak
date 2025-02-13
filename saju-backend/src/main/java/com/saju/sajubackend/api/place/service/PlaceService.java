package com.saju.sajubackend.api.place.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.saju.sajubackend.api.couple.domain.Couple;
import com.saju.sajubackend.api.couple.repository.CoupleRepository;
import com.saju.sajubackend.api.place.domain.Place;
import com.saju.sajubackend.api.place.dto.PlaceResponseDto;
import com.saju.sajubackend.api.place.repository.PlaceRepository;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final CoupleRepository coupleRepository;

    @Value("${tourapi.service-key}")
    private String serviceKey;

    @Value("${tourapi.url}")
    private String tourApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    @Transactional(readOnly = true)
    public List<PlaceResponseDto> getPlaceList(LocalDate date, Long memberId) {
        Couple couple = coupleRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.COUPLE_NOT_FOUND));

        Long fCity = ((couple.getCoupleFemale().getCityCode()) / 100000000L) * 100000000L;
        Long mCity = ((couple.getCoupleMale().getCityCode()) / 100000000L) * 100000000L;
        int lack = couple.getLackElement().getCode();

        List<Place> places = placeRepository.findPlaces(lack, fCity, mCity)
                .filter(list -> !list.isEmpty())
                .orElseGet(() -> placeRepository.findPlacesByElementOnly(lack));

        return places
                .stream()
                .map(place -> new PlaceResponseDto(
                        place.getName(),
                        place.getAddress(),
                        getImage(place.getName())
                ))
                .toList();
    }

    private String getImage(String keyword) {
        try {
            String url = buildApiUrl(keyword);
            URI uri = new URI(url.toString());

            ResponseEntity<String> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, HttpEntity.EMPTY, String.class);
            String jsonResponse = responseEntity.getBody();
            JsonNode root = mapper.readTree(jsonResponse);

            JsonNode firstItem = root.path("response")
                    .path("body")
                    .path("items")
                    .path("item")
                    .get(0);

            return firstItem.path("firstimage").asText();
        } catch (IOException e) {
            throw new RuntimeException("Error fetching image from API for keyword: " + keyword, e);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    private String buildApiUrl(String keyword) {
        String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
        return tourApiUrl + encodedKeyword + "&ServiceKey=" + serviceKey;
    }
}
