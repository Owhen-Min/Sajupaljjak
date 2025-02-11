package com.saju.sajubackend.common.util;

import com.saju.sajubackend.common.enums.CelestialStem;
import com.saju.sajubackend.common.enums.Element;

import java.util.Collections;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class LackElementCalculator {
    public static Map<Element, Integer> calculateElementCount(List<String> saju) {
        Map<Element, Integer> elementCount = new EnumMap<>(Element.class);
        for (Element element : Element.values()) {
            elementCount.put(element, 0);
        }
        for (String part : saju) {
            if (part == null || part.length() != 2) continue;
            String stem = part.substring(0, 1);
            String branch = part.substring(1, 2);

            Element stemElement = CelestialStem.getElementByStem(stem);
            if (stemElement != null) {
                elementCount.put(stemElement, elementCount.getOrDefault(stemElement, 0) + 1);
            }

            List<Element> branchElements = getElementsByBranch(branch.charAt(0));
            if (branchElements != null) {
                for (Element element : branchElements) {
                    elementCount.put(element, elementCount.getOrDefault(element, 0) + 1);
                }
            }
        }
        return elementCount;
    }

    public static Element findMostLackingElement(Map<Element, Integer> count1, Map<Element, Integer> count2) {
        Map<Element, Integer> totalCount = new EnumMap<>(Element.class);
        for (Element element : Element.values()) {
            totalCount.put(element, count1.get(element) + count2.get(element));
        }
        return Collections.min(totalCount.entrySet(), Map.Entry.comparingByValue()).getKey();
    }

    private static List<Element> getElementsByBranch(char branch) {
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
}
