package com.saju.sajubackend.common.converter;

import com.saju.sajubackend.common.enums.MessageType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class MessageTypeConverter implements AttributeConverter<MessageType, Integer> {

    @Override
    public Integer convertToDatabaseColumn(MessageType messageType) {
        if (messageType == null) return null;
        return messageType.getCode();
    }

    @Override
    public MessageType convertToEntityAttribute(Integer code) {
        if (code == null) return null;
        return MessageType.fromCode(code);
    }
}
