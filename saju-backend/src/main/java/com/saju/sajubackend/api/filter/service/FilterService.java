package com.saju.sajubackend.api.filter.service;

import com.saju.sajubackend.api.auth.dto.LoginResponse;
import com.saju.sajubackend.api.auth.dto.SignupRequest;
import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.filter.domain.RegionFilter;
import com.saju.sajubackend.api.filter.domain.ReligionFilter;
import com.saju.sajubackend.api.filter.dto.FilterResponseDto;
import com.saju.sajubackend.api.filter.dto.FilterSaveRequestDto;
import com.saju.sajubackend.api.filter.repository.FilterRepository;
import com.saju.sajubackend.api.filter.repository.RegionFilterRepository;
import com.saju.sajubackend.api.filter.repository.ReligionFilterRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.enums.DrinkingFrequency;
import com.saju.sajubackend.common.enums.Religion;
import com.saju.sajubackend.common.enums.SmokingStatus;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.util.CelestialStemCalculator;
import com.saju.sajubackend.common.util.FourPillarsCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FilterService {

    private final MemberRepository memberRepository;
    private final FilterRepository filterRepository;
    private final ReligionFilterRepository religionFilterRepository;
    private final RegionFilterRepository regionFilterRepository;

    @Transactional
    public void createFilter(FilterSaveRequestDto request, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));

        Filter filter = filterRepository.save(request.toFilter(member));

        saveRegionFilters(request.regionFilter(), filter);
        saveReligionFilters(request.toReligionFilters(filter));
    }

    public FilterResponseDto getFilter(Long memberId) {
        Filter filter = filterRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.FILTER_NOT_FOUND));

        List<RegionFilter> regionFilters = regionFilterRepository.findByFilter(filter);
        List<ReligionFilter> religionFilters = religionFilterRepository.findByFilter(filter);

        return FilterResponseDto.from(filter, regionFilters, religionFilters);
    }

    @Transactional
    public void updateFilter(FilterSaveRequestDto request, Long memberId) {
        Filter filter = filterRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.FILTER_NOT_FOUND));

        filter.update(SmokingStatus.fromLabel(request.smoking()), DrinkingFrequency.fromLabel(request.drinking()),
                request.minHeight(), request.maxHeight(),
                request.minAge(), request.maxAge());

        regionFilterRepository.deleteByFilter(filter);
        saveRegionFilters(request.regionFilter(), filter);

        religionFilterRepository.deleteByFilter(filter);
        List<ReligionFilter> religionFilters = request.religionFilter().stream()
                .map(label -> ReligionFilter.builder()
                        .religion(Religion.fromLabel(label))
                        .filter(filter)
                        .build())
                .collect(Collectors.toList());
        saveReligionFilters(religionFilters);
    }

    private void saveRegionFilters(List<String> cityCodes, Filter filter) {
        if (cityCodes.isEmpty()) return;

        List<RegionFilter> regionFilters = cityCodes.stream()
                .map(cityCode -> RegionFilter.builder()
                        .cityCode(Long.valueOf(cityCode))
                        .filter(filter)
                        .build())
                .collect(Collectors.toList());

        regionFilterRepository.saveAll(regionFilters);
    }

    private void saveReligionFilters(List<ReligionFilter> religions) {
        if (religions.isEmpty()) return;

        religionFilterRepository.saveAll(religions);
    }
}