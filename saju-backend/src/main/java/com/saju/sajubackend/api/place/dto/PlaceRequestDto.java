package com.saju.sajubackend.api.place.dto;


import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public record PlaceRequestDto(
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate date
) {
}
