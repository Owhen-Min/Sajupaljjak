package com.saju.sajubackend.api.file.dto;

import jakarta.validation.constraints.NotBlank;

public record PresignedUrlRequestDto(
        @NotBlank(message = "파일 이름은 필수입니다.") String filename
) {
}
