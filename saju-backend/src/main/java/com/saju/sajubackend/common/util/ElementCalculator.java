package com.saju.sajubackend.common.util;

import com.saju.sajubackend.common.enums.CelestialStem;
import com.saju.sajubackend.common.enums.Element;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class ElementCalculator {
    public static Map<Element, Integer> calculateElementCount(List<String> saju) {
        Map<Element, Integer> elementCount = new EnumMap<>(Element.class);
        for (Element element : Element.values()) {
            elementCount.put(element, 0);
        }
        for (String part : saju) {
            if (part == null || part.length() != 2) continue;

            Element stemElement = CelestialStem.getElementByStem(part.charAt(0));
            if (stemElement != null) {
                elementCount.put(stemElement, elementCount.getOrDefault(stemElement, 0) + 1);
            }

            List<Element> branchElements = getElementsByBranch(part.charAt(1));
            if (branchElements != null) {
                for (Element element : branchElements) {
                    elementCount.put(element, elementCount.getOrDefault(element, 0) + 1);
                }
            }
        }
        return elementCount;
    }

    public static ElementInfo getLackAndPlentyElement(Map<Element, Integer> count1, Map<Element, Integer> count2) {
        Map<Element, Integer> totalCount = new EnumMap<>(Element.class);
        for (Element element : Element.values()) {
            totalCount.put(element, count1.get(element) + count2.get(element));
        }
        return new ElementInfo(
                Collections.min(totalCount.entrySet(), Map.Entry.comparingByValue()).getKey(),
                Collections.max(totalCount.entrySet(), Map.Entry.comparingByValue()).getKey());
    }

    public static List<Element> getElementsByBranch(char branch) {
        return switch (branch) {
            case '자' -> List.of(Element.WATER);
            case '축' -> List.of(Element.EARTH, Element.WATER, Element.METAL);
            case '인' -> List.of(Element.WOOD, Element.FIRE, Element.EARTH);
            case '묘' -> List.of(Element.WOOD);
            case '진' -> List.of(Element.EARTH, Element.WOOD, Element.WATER);
            case '사' -> List.of(Element.FIRE, Element.EARTH, Element.METAL);
            case '오' -> List.of(Element.FIRE, Element.EARTH);
            case '미' -> List.of(Element.EARTH, Element.WOOD, Element.FIRE);
            case '신' -> List.of(Element.METAL, Element.WATER, Element.EARTH);
            case '유' -> List.of(Element.METAL);
            case '술' -> List.of(Element.EARTH, Element.METAL, Element.FIRE);
            case '해' -> List.of(Element.WATER, Element.WOOD);
            default -> Collections.emptyList();
        };
    }

    public static List<Element> getDayElements(LocalDate date) {
        String dayPillar = FourPillarsCalculator.calculateDayPillar(LocalDateTime.of(date, LocalTime.MIDNIGHT));

        Element elementByStem = CelestialStem.getElementByStem(dayPillar.charAt(0));
        List<Element> elementsByBranch = ElementCalculator.getElementsByBranch(dayPillar.charAt(1));

        elementsByBranch.add(elementByStem);
        return elementsByBranch;
    }
}
