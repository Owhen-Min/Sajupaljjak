package com.saju.sajubackend.common.converter;

import com.saju.sajubackend.common.enums.DrinkingFrequency;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class DrinkingFrequencyConverter implements AttributeConverter<DrinkingFrequency, Integer> {

    @Override
    public Integer convertToDatabaseColumn(DrinkingFrequency frequency) {
        if (frequency == null) return null;
        return frequency.getCode();
    }

    @Override
    public DrinkingFrequency convertToEntityAttribute(Integer code) {
        if (code == null) return null;
        return DrinkingFrequency.fromCode(code);
    }
}

