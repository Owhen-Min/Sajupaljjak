package com.saju.sajubackend.common.converter;

import com.saju.sajubackend.common.enums.Gender;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class GenderConverter implements AttributeConverter<Gender, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Gender gender) {
        if (gender == null) return null;
        return gender.getCode();
    }

    @Override
    public Gender convertToEntityAttribute(Integer code) {
        if (code == null) return null;
        return Gender.fromCode(code);
    }
}
