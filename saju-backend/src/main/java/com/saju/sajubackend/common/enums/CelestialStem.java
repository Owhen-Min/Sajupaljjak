package com.saju.sajubackend.common.enums;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CelestialStem {

    BYEONG_HWA(0, "병화"),
    JEONG_HWA(1, "정화"),
    IM_SU(2, "임수"),
    GYE_SU(3, "계수"),
    GAP_MOK(4, "갑목"),
    EUL_MOK(5, "을목"),
    GYEONG_GUM(6, "경금"),
    SHIN_GUM(7, "신금"),
    MU_TO(8, "무토"),
    GI_TO(9, "기토");

    private final int code;
    private final String label;

    public static CelestialStem fromCode(int code) {
        for (CelestialStem stem : CelestialStem.values()) {
            if (stem.code == code) {
                return stem;
            }
        }
        throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_CELESTIAL_STEM_CODE);
    }

    public static CelestialStem fromLabel(String label) {
        for (CelestialStem stem : CelestialStem.values()) {
            if (stem.label.equals(label)) {
                return stem;
            }
        }
        throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_CELESTIAL_STEM_LABEL);
    }
}


