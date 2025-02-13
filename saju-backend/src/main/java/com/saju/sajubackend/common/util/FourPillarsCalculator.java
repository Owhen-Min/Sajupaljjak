package com.saju.sajubackend.common.util;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

public class FourPillarsCalculator {

    // 천간 (Heavenly Stems)
    private static final String[] HEAVENLY_STEMS = {"갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"};

    // 지지 (Earthly Branches)
    private static final String[] EARTHLY_BRANCHES = {"자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"};

    // 60갑자 배열
    private static final String[] SIXTY_GANZHI = new String[60];

    static {
        for (int i = 0; i < 60; i++) {
            SIXTY_GANZHI[i] = HEAVENLY_STEMS[i % 10] + EARTHLY_BRANCHES[i % 12];
        }
    }

    // 월별 절입일
    private static final int[][] SOLAR_TERMS = {
            {1, 6, 21}, {2, 4, 19}, {3, 6, 21}, {4, 5, 20}, {5, 6, 21}, {6, 6, 22},
            {7, 7, 23}, {8, 8, 23}, {9, 8, 23}, {10, 8, 24}, {11, 7, 22}, {12, 7, 22}
    };

    // 갑자일 기준일 (1924-02-05)
    private static final LocalDate REFERENCE_DATE = LocalDate.of(1924, 2, 5);

    public static class FourPillars {
        public String yearPillar;
        public String monthPillar;
        public String dayPillar;
        public String hourPillar;

        public FourPillars(String yearPillar, String monthPillar, String dayPillar, String hourPillar) {
            this.yearPillar = yearPillar;
            this.monthPillar = monthPillar;
            this.dayPillar = dayPillar;
            this.hourPillar = hourPillar;
        }

        @Override
        public String toString() {
            return String.format("연주:%s, 월주:%s, 일주:%s, 시주:%s",
                    yearPillar, monthPillar, dayPillar, hourPillar);
        }
    }

    private static String calculateYearPillar(LocalDateTime dateTime) {
        int year = dateTime.getYear();
        int month = dateTime.getMonthValue();
        int day = dateTime.getDayOfMonth();

        if (month == 1 || (month == 2 && day < 4)) {
            year--;
        }

        int stemIndex = (year - 4) % 10;
        int branchIndex = (year - 4) % 12;

        return HEAVENLY_STEMS[(stemIndex + 10) % 10] + EARTHLY_BRANCHES[(branchIndex + 12) % 12];
    }

    private static String calculateMonthPillar(LocalDateTime dateTime) {
        int year = dateTime.getYear();
        int month = dateTime.getMonthValue();
        int day = dateTime.getDayOfMonth();

        int[] solarTerm = SOLAR_TERMS[month - 1];
        if (day < solarTerm[1]) {
            month = (month - 1 == 0) ? 12 : month - 1;
        }

        int yearStem = (year - 4) % 10;
        if (yearStem < 0) yearStem += 10;

        int monthStem = (yearStem * 2 + month) % 10;
        if (monthStem < 0) monthStem += 10;

        int monthBranch = (month + 1) % 12;
        if (monthBranch == 0) monthBranch = 12;
        monthBranch = (monthBranch - 1) % 12;

        return HEAVENLY_STEMS[monthStem] + EARTHLY_BRANCHES[monthBranch];
    }

    public static String calculateDayPillar(LocalDateTime dateTime) {
        LocalDate date = dateTime.toLocalDate();
        int hour = dateTime.getHour();

        if (hour >= 23) { // 야자시 보정
            date = date.plusDays(1);
        }

        long daysBetween = ChronoUnit.DAYS.between(REFERENCE_DATE, date);
        int dayIndex = (int) ((daysBetween + 50) % 60);

        return SIXTY_GANZHI[dayIndex];
    }

    private static int getStemIndex(String stem) {
        for (int i = 0; i < HEAVENLY_STEMS.length; i++) {
            if (HEAVENLY_STEMS[i].equals(stem)) return i;
        }
        return 0;
    }

    private static String calculateHourPillar(String dailyPillar, LocalTime birthTime) {
        if (birthTime == null) {
            return calculateHourPillar(dailyPillar, LocalTime.of(0, 0));
        }

        // 태양시 보정 (30분 빼기)
        birthTime = birthTime.minusMinutes(30);
        int hour = birthTime.getHour();

        // 점신 어플 로직: 00:30~01:59 출생자는 자시(子時)로 간주
        int branchIndex;
        if (hour == 0 || (hour == 1 && birthTime.getMinute() < 59)) {
            branchIndex = 0; // 자시(子)
        } else {
            branchIndex = (hour + 1) / 2 % 12;
        }
        String hourBranch = EARTHLY_BRANCHES[branchIndex];

        // 시천간 계산
        String dailyStem = dailyPillar.substring(0, 1);
        int dayStemIndex = getStemIndex(dailyStem);
        int hourStemIndex = (dayStemIndex * 2 + branchIndex) % 10;

        return HEAVENLY_STEMS[hourStemIndex] + hourBranch;
    }

    public static FourPillars calculate(LocalDateTime birthDateTime) {
        String yearPillar = calculateYearPillar(birthDateTime);
        String monthPillar = calculateMonthPillar(birthDateTime);
        String dayPillar = calculateDayPillar(birthDateTime);
        String hourPillar = calculateHourPillar(dayPillar, birthDateTime.toLocalTime());

        return new FourPillars(yearPillar, monthPillar, dayPillar, hourPillar);
    }


}
