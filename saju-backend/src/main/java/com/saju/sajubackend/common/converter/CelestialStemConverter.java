package com.saju.sajubackend.common.converter;

import com.saju.sajubackend.common.enums.CelestialStem;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class CelestialStemConverter implements AttributeConverter<CelestialStem, Integer> {

    @Override
    public Integer convertToDatabaseColumn(CelestialStem stem) {
        if (stem == null) return null;
        return stem.getCode();
    }

    @Override
    public CelestialStem convertToEntityAttribute(Integer code) {
        if (code == null) return null;
        return CelestialStem.fromCode(code);
    }
}

