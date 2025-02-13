package com.saju.sajubackend.api.saju.dto;


import com.saju.sajubackend.api.saju.entity.CoupleYear;

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
    public static CoupleYearDto fromEntity(CoupleYear coupleYear) {
        if (coupleYear == null) {
            return null; // 예외 처리
        }
        return new CoupleYearDto(
                coupleYear.getCoupleYearId(),
                coupleYear.getMale(),
                coupleYear.getFemale(),
                coupleYear.getHarmony(),
                coupleYear.getChemi(),
                coupleYear.getGood(),
                coupleYear.getBad(),
                coupleYear.getAdvice()
        );
    }
}
