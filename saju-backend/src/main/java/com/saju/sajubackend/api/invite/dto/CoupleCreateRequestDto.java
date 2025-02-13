package com.saju.sajubackend.api.invite.dto;

import java.time.LocalDateTime;

public record CoupleCreateRequestDto(
        String invitingCode,
        LocalDateTime startDate
) {
}