package com.saju.sajubackend.common.converter;

import com.saju.sajubackend.common.enums.RelationshipStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class RelationshipStatusConverter implements AttributeConverter<RelationshipStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(RelationshipStatus soloStatus) {
        if (soloStatus == null) return null;
        return soloStatus.getCode();
    }

    @Override
    public RelationshipStatus convertToEntityAttribute(Integer code) {
        if (code == null) return null;
        return RelationshipStatus.fromCode(code);
    }
}
