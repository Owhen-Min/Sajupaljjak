package com.saju.sajubackend.api.filter.service;

import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.filter.domain.RegionFilter;
import com.saju.sajubackend.api.filter.domain.ReligionFilter;
import com.saju.sajubackend.api.filter.dto.FilterSaveRequestDto;
import com.saju.sajubackend.api.filter.repository.FilterRepository;
import com.saju.sajubackend.api.filter.repository.RegionFilterRepository;
import com.saju.sajubackend.api.filter.repository.ReligionFilterRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FilterService {

    private final FilterRepository filterRepository;
    private final ReligionFilterRepository religionFilterRepository;
    private final RegionFilterRepository regionFilterRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void createFilter(FilterSaveRequestDto request, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));

        Filter filter = filterRepository.save(request.toFilter(member));

        saveRegionFilters(request.regionFilter(), filter);
        saveReligionFilters(request.toReligionFilters(filter));
    }

    private void saveRegionFilters(List<Integer> cityCodes, Filter filter) {
        if (cityCodes.isEmpty()) return;

        List<RegionFilter> regionFilters = cityCodes.stream()
                .map(cityCode -> RegionFilter.builder()
                        .cityCode(cityCode)
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
