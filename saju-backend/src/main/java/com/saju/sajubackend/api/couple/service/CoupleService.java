package com.saju.sajubackend.api.couple.service;

import com.saju.sajubackend.api.couple.domain.Couple;
import com.saju.sajubackend.api.couple.dto.CoupleDateListResponseDto;
import com.saju.sajubackend.api.couple.dto.CoupleResponseDto;
import com.saju.sajubackend.api.couple.repository.CoupleRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.enums.Element;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.util.ElementCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class CoupleService {

    private final CoupleRepository coupleRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public CoupleResponseDto getCouple(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));

        Couple couple = coupleRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.COUPLE_NOT_FOUND));

        return CoupleResponseDto.fromEntity(couple);
    }

    @Transactional(readOnly = true)
    public CoupleDateListResponseDto getCoupleDateList(int month, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));

        Couple couple = coupleRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.COUPLE_NOT_FOUND));

        LocalDate now = LocalDate.now();
        Stream<LocalDate> dateStream;
        if (month == now.getMonthValue()) {
            dateStream = Stream.concat(getDatesForMonth(now), getDatesForMonth(now.plusMonths(1)));
        } else {
            LocalDate monthStart = LocalDate.of(now.getYear(), month, 1);
            dateStream = getDatesForMonth(monthStart);
        }

        Element lack = couple.getLackElement();
        Element plenty = couple.getPlentyElement();

        List<LocalDate> dates = dateStream.toList();

        CoupleDateAccumulator acc = dates.stream()
                .collect(Collector.of(
                        CoupleDateAccumulator::new,
                        (a, date) -> {
                            List<Element> dayElements = ElementCalculator.getDayElements(date);
                            if (dayElements.contains(lack)) {
                                a.goodDates.add(date.toString());
                            } else if (dayElements.contains(plenty)) {
                                a.badDates.add(date.toString());
                            }
                        },
                        (a1, a2) -> {
                            a1.goodDates.addAll(a2.goodDates);
                            a1.badDates.addAll(a2.badDates);
                            return a1;
                        }
                ));

        return new CoupleDateListResponseDto(acc.goodDates, acc.badDates);
    }

    private Stream<LocalDate> getDatesForMonth(LocalDate date) {
        LocalDate monthStart = date.withDayOfMonth(1);
        LocalDate monthEnd = monthStart.withDayOfMonth(monthStart.lengthOfMonth());
        return monthStart.datesUntil(monthEnd.plusDays(1));
    }

    private static class CoupleDateAccumulator {
        List<String> goodDates = new ArrayList<>();
        List<String> badDates = new ArrayList<>();
    }
}
