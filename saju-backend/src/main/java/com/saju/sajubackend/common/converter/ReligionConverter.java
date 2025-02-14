package com.saju.sajubackend.common.converter;

import com.saju.sajubackend.common.enums.Religion;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ReligionConverter implements AttributeConverter<Religion, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Religion religion) {
        if (religion == null) return null;
        return religion.getCode();
    }

    @Override
    public Religion convertToEntityAttribute(Integer code) {
        if (code == null) return null;
        return Religion.fromCode(code);
    }
}

