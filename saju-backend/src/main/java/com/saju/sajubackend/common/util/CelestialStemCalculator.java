package com.saju.sajubackend.common.util;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Map;

/**
 * 천간(天干)을 계산하는 유틸리티 클래스
 */
public class CelestialStemCalculator {

    private static final String[] CELESTIAL_STEMS = {"갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"};

    private static final Map<String, String> STEM_TO_ELEMENT = Map.of(
            "갑", "갑목", "을", "을목",
            "병", "병화", "정", "정화",
            "무", "무토", "기", "기토",
            "경", "경금", "신", "신금",
            "임", "임수", "계", "계수"
    );

    // 갑자일(甲子日) 기준일 (1924-02-05)
    private static final LocalDate REFERENCE_DATE = LocalDate.of(1924, 2, 5);

    /**
     * 생년월일을 기준으로 천간(日干)과 오행을 계산
     *
     * @param birthDate 생년월일
     * @return 천간과 오행 (예: "기토", "갑목")
     */
    public static String calculateCelestialStem(LocalDate birthDate) {
        long daysBetween = ChronoUnit.DAYS.between(REFERENCE_DATE, birthDate);

        // 천간은 10일 주기로 반복됨
        int stemIndex = (int) ((daysBetween + 60) % 10); // 음수 방지를 위해 +60 추가
        String stem = CELESTIAL_STEMS[stemIndex];

        return STEM_TO_ELEMENT.get(stem);
    }
}
