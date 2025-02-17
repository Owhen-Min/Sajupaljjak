package com.saju.sajubackend.common.validator;

import java.util.Set;

public class MessageTypeValidator {

    private static final Set<String> VALID_MESSAGE_TYPES = Set.of("TEXT", "VIDEO", "MATCH", "MEMBER_INFO");

    public static boolean isValidType(String type) {
        return VALID_MESSAGE_TYPES.contains(type);
    }
}
