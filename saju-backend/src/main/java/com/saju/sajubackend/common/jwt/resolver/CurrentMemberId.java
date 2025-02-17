package com.saju.sajubackend.common.jwt.resolver;

import java.lang.annotation.*;

@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CurrentMemberId {
}