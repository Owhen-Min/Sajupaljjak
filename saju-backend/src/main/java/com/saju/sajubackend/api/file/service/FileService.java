package com.saju.sajubackend.api.file.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class FileService {
    private final S3Presigner s3Presigner;

    @Value("${cloud.s3.bucket}")
    private String bucketName;

    public String getPreSignedUploadUrl(String filename) {
        if (filename.isEmpty()) {
            return null;
        }

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        PutObjectPresignRequest putObjectPresignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofHours(1))
                .putObjectRequest(putObjectRequest)
                .build();

        PresignedPutObjectRequest presignedPutObjectRequest = s3Presigner.presignPutObject(putObjectPresignRequest);

        return presignedPutObjectRequest.url().toString();
    }
}
