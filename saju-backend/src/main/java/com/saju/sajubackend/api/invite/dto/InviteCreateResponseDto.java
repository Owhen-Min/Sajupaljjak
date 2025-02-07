package com.saju.sajubackend.api.invite.dto;

public record InviteCreateResponseDto(
        String invitingCode,
        Long ttl
) {
}