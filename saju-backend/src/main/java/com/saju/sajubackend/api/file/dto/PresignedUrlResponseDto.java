package com.saju.sajubackend.api.file.dto;

import jakarta.validation.constraints.NotBlank;

public record PresignedUrlResponseDto(
        @NotBlank(message = "Presigned URL은 필수입니다.")
        String presignedUrl,

        @NotBlank(message = "Object key는 필수입니다.")
        String objectKey
) {
}
