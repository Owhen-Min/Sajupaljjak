package com.saju.sajubackend.common.converter;

import com.saju.sajubackend.common.enums.Element;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ElementConverter implements AttributeConverter<Element, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Element element) {
        if (element == null) return null;
        return element.getCode();
    }

    @Override
    public Element convertToEntityAttribute(Integer code) {
        if (code == null) return null;
        return Element.fromCode(code);
    }
}
