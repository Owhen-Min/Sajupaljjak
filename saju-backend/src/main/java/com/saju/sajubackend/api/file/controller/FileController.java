package com.saju.sajubackend.api.file.controller;

import com.saju.sajubackend.api.file.dto.PresignedUrlRequestDto;
import com.saju.sajubackend.api.file.dto.PresignedUrlResponseDto;
import com.saju.sajubackend.api.file.service.FileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping()
    public ResponseEntity<PresignedUrlResponseDto> generatePresignedUrl(
            @Valid @RequestBody PresignedUrlRequestDto requestDto
            /* , @AuthenticationPrincipal  */
    ) {
        String originalFilename = requestDto.filename();

        String fileExtension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            fileExtension = originalFilename.substring(dotIndex);
        }

        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
        String objectKey = uniqueFilename;

        String presignedUrl = fileService.getPreSignedUploadUrl(objectKey);

        PresignedUrlResponseDto responseDto = new PresignedUrlResponseDto(presignedUrl, objectKey);
        return ResponseEntity.ok(responseDto);
    }
}
