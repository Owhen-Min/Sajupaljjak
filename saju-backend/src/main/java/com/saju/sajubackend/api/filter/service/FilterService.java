package com.saju.sajubackend.api.filter.service;

import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.filter.domain.RegionFilter;
import com.saju.sajubackend.api.filter.domain.ReligionFilter;
import com.saju.sajubackend.api.filter.dto.UserPreferenceRequest;
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

    public void createFilter(UserPreferenceRequest request, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()->new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));

        Filter filter = filterRepository.save(Filter.from(request, member));

        saveRegionFilters(request.getRegionFilter(), filter);
        saveReligionFilters(request.getReligionFilter(), filter);
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

    private void saveReligionFilters(List<Integer> religionIds, Filter filter) {
        if (religionIds.isEmpty()) return;

        List<ReligionFilter> religionFilters = religionIds.stream()
                .map(religionId -> ReligionFilter.builder()
                        .religionId(religionId)
                        .filter(filter)
                        .build())
                .collect(Collectors.toList());

        religionFilterRepository.saveAll(religionFilters);
    }
}
