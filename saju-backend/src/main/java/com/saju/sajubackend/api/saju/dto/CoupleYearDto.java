package com.saju.sajubackend.api.saju.dto;


import com.saju.sajubackend.api.saju.entity.CoupleYearFortune;

public record CoupleYearDto(
        Long id,
        String male,
        String female,
        String harmony,
        String chemi,
        String good,
        String bad,
        String advice
) {
    public static CoupleYearDto fromEntity(CoupleYearFortune coupleYearFortune) {
        if (coupleYearFortune == null) {
            return null; // 예외 처리
        }
        return new CoupleYearDto(
                coupleYearFortune.getCoupleYearId(),
                coupleYearFortune.getMale(),
                coupleYearFortune.getFemale(),
                coupleYearFortune.getHarmony(),
                coupleYearFortune.getChemi(),
                coupleYearFortune.getGood(),
                coupleYearFortune.getBad(),
                coupleYearFortune.getAdvice()
        );
    }
}
