package com.saju.sajubackend.api.filter.dto;

import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.filter.domain.RegionFilter;
import com.saju.sajubackend.api.filter.domain.ReligionFilter;

import java.util.List;
import java.util.Optional;

public record FilterResponseDto(
        String memberId,
        String smoking,
        String drinking,
        Integer minHeight,
        Integer maxHeight,
        Integer minAge,
        Integer maxAge,
        List<String> regionFilters,
        List<String> religionFilters
) {
    public static FilterResponseDto from(Filter filter,
                                         List<RegionFilter> regionFilters,
                                         List<ReligionFilter> religionFilters) {
        return new FilterResponseDto(
                filter.getMember().getMemberId().toString(),
                filter.getSmoking() != null ? filter.getSmoking().getLabel() : null,
                filter.getDrinking() != null ? filter.getDrinking().getLabel() : null,
                filter.getMinHeight(),
                filter.getMaxHeight(),
                filter.getMinAge(),
                filter.getMaxAge(),
                Optional.ofNullable(regionFilters)
                        .orElse(List.of())
                        .stream()
                        .map(rf -> rf.getCityCode().toString())
                        .toList(),
                Optional.ofNullable(religionFilters)
                        .orElse(List.of())
                        .stream()
                        .map(rf -> rf.getReligion().getLabel())
                        .toList()
        );
    }
}
