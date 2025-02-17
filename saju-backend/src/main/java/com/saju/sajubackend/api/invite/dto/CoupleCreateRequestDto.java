package com.saju.sajubackend.api.invite.dto;

import java.time.LocalDate;

public record CoupleCreateRequestDto(
        String invitingCode,
        LocalDate startDate
) {
}