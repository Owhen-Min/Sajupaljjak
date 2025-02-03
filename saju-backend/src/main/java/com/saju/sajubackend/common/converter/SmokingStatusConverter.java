package com.saju.sajubackend.common.converter;

import com.saju.sajubackend.common.enums.SmokingStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class SmokingStatusConverter implements AttributeConverter<SmokingStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(SmokingStatus status) {
        if (status == null) return null;
        return status.getCode();
    }

    @Override
    public SmokingStatus convertToEntityAttribute(Integer code) {
        if (code == null) return null;
        return SmokingStatus.fromCode(code);
    }
}

